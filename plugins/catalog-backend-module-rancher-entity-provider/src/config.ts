import { readSchedulerServiceTaskScheduleDefinitionFromConfig } from '@backstage/backend-plugin-api';
import { Config } from '@backstage/config';
import { RancherConfig } from './types';

export function readRancherConfigs(config: Config): RancherConfig[] {
  const configs: RancherConfig[] = [];

  const providerConfigs = config.getOptionalConfig(
    'catalog.providers.rancher',
  );

  if (!providerConfigs) {
    return configs;
  }

  for (const id of providerConfigs.keys()) {
    configs.push(readRancherConfig(id, providerConfigs.getConfig(id)));
  }

  return configs;
}

function readRancherConfig(id: string, config: Config): RancherConfig {
  const serverUrl = config.getString('serverUrl');
  const token = config.getString('token');

  const schedule = config.has('schedule')
    ? readSchedulerServiceTaskScheduleDefinitionFromConfig(
        config.getConfig('schedule'),
      )
    : undefined;

  return {
    id,
    serverUrl,
    token,
    schedule,
  };
}
