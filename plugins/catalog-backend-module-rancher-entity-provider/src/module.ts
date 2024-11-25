import {
  coreServices,
  createBackendModule,
} from '@backstage/backend-plugin-api';

import { catalogProcessingExtensionPoint } from '@backstage/plugin-catalog-node/alpha';

import { RancherEntityProvider } from './rancher';

export const catalogModuleRancherEntityProvider = createBackendModule({
  pluginId: 'catalog',
  moduleId: 'rancher-entity-provider',
  register(reg) {
    reg.registerInit({
      deps: {
        config: coreServices.rootConfig,
        catalog: catalogProcessingExtensionPoint,
        logger: coreServices.logger,
        scheduler: coreServices.scheduler,      
      },
      async init({ logger, catalog, scheduler, config }) {
        catalog.addEntityProvider(
          RancherEntityProvider.fromConfig(config, {
            logger,
            scheduler,
          }),
        );
      },
    });
  },
});
