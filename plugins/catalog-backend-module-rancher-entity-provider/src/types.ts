import { SchedulerServiceTaskScheduleDefinition } from '@backstage/backend-plugin-api';

export type RancherConfig = {
  id: string;
  serverUrl: string;
  token: string;
  schedule?: SchedulerServiceTaskScheduleDefinition;
};
