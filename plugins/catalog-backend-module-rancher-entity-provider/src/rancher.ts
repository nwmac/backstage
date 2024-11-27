import * as uuid from 'uuid';

import { Config } from '@backstage/config';
import {
  EntityProvider,
  EntityProviderConnection,
} from '@backstage/plugin-catalog-node';

import {
  SchedulerService,
  SchedulerServiceTaskRunner,
  LoggerService,
} from '@backstage/backend-plugin-api';

import { UserEntity } from '@backstage/catalog-model';

import { readRancherConfigs } from './config';
import { RancherConfig } from './types';


export class RancherEntityProvider implements EntityProvider {
  private readonly logger: LoggerService;
  private readonly scheduleFn: () => Promise<void>;
  private connection?: EntityProviderConnection;

  static fromConfig(
    configRoot: Config,
    options: {
      logger: LoggerService;
      schedule?: SchedulerServiceTaskRunner;
      scheduler?: SchedulerService;
    },
  ): RancherEntityProvider[] {  
    const providerConfigs = readRancherConfigs(configRoot);

    return providerConfigs.map(providerConfig => {

      console.error(providerConfig.id);
      if (!options.schedule && !providerConfig.schedule) {
        throw new Error(
          `No schedule provided neither via code nor config for RancherEntityProvider:${providerConfig.id}.`,
        );
      }

      const taskRunner =
        options.schedule ??
        options.scheduler!.createScheduledTaskRunner(providerConfig.schedule!);

      return new RancherEntityProvider(
        providerConfig,
        options.logger,
        taskRunner,
      );
    });

  }

  private constructor(
    private readonly config: RancherConfig,
    logger: LoggerService,
    taskRunner: SchedulerServiceTaskRunner,
  ) {

    this.logger = logger.child({
      target: this.getProviderName(),
    });

    this.scheduleFn = this.createScheduleFn(taskRunner);
  }  

  private createScheduleFn(
    taskRunner: SchedulerServiceTaskRunner,
  ): () => Promise<void> {
    return async () => {
      const taskId = `${this.getProviderName()}:refresh`;
      return taskRunner.run({
        id: taskId,
        fn: async () => {
          const logger = this.logger.child({
            class: RancherEntityProvider.prototype.constructor.name,
            taskId,
            taskInstanceId: uuid.v4(),
          });

          try {
            await this.refresh(logger);
          } catch (error) {
            logger.error(
              `${this.getProviderName()} refresh failed, ${error}`,
              error as any,
            );
          }
        },
      });
    };
  }
  
  getProviderName(): string {
    return `RancherEntityProvider:${this.config.id}`;
  }

  /** {@inheritdoc @backstage/plugin-catalog-backend#EntityProvider.connect} */
  async connect(connection: EntityProviderConnection): Promise<void> {
    this.connection = connection;
    // Run the task at start up
    await this.scheduleFn();
  }

  async refresh(logger: LoggerService) {
    if (!this.connection) {
      throw new Error('Not initialized');
    }

    logger.info(`Rancher URL: ${ this.config.serverUrl }`);
    logger.info(`Rancher Token: ${ this.config.token }`);

    const users: UserEntity[] = [];

    // Try a fetch
    const url = `${ this.config.serverUrl }/v1/management.cattle.io.users`;
    const token = this.config.token;
    const headers = new Headers();

    headers.set('Authorization', 'Bearer ' + token);

    const r = await fetch(url, {
      method: 'GET',
      headers
    });

    if (r.status === 200) {
      const data = await r.json();

      if (data.count && data.data) {
        data.data.forEach((user: any) => {
          if (user.username) {
            logger.info(`Rancher catalog entity provider synced user: ${ user.username}`);

            users.push(this.convertRancherUserToEntity(user));
          }
        });

        await this.connection.applyMutation({
          type: 'full',
          entities: users.map(entity => {
            return {
              locationKey: this.getProviderName(),
              entity,
            };
          }),
        });
      }
    } else {
      logger.error(`Rancher catalog provider could not fetch users: ${ r.status } ${ r.statusText }`);
    }
  }

  convertRancherUserToEntity(user: any): UserEntity {
    return {
      apiVersion: 'backstage.io/v1alpha1',
      kind: 'User',
      metadata: {
        name: user.username,
        description: user.description,
        namespace: 'development',
        annotations: {
          'cattle.io/user-id': user.username,
          'backstage.io/managed-by-location': this.getProviderName(),
          'backstage.io/managed-by-origin-location': this.getProviderName(),
        }
      },
      spec: {
        profile: {
          displayName: user.displayName,
        },
        memberOf: [ 'group:default/team-a' ]
      }
    }

  }
 
}