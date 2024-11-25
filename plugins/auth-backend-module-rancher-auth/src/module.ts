import {
  coreServices,
  createBackendModule,
} from '@backstage/backend-plugin-api';

import {
  authProvidersExtensionPoint,
  commonSignInResolvers,
  createProxyAuthProviderFactory,
} from '@backstage/plugin-auth-node';

import { rancherAuthenticator } from './authenticator';
import { rancherSignInResolvers } from './resolvers';

export const authModuleRancherAuth = createBackendModule({
  pluginId: 'auth',
  moduleId: 'rancher-provider',
  register(reg) {
    reg.registerInit({
      deps: {
        logger: coreServices.logger,
        providers: authProvidersExtensionPoint,
      },
      async init({ logger, providers }) {
        logger.info('Rancher Authentication Provider');

        providers.registerProvider({
          providerId: 'rancher',
          factory: createProxyAuthProviderFactory({
            authenticator: rancherAuthenticator,
            signInResolverFactories: {
              ...rancherSignInResolvers,
              ...commonSignInResolvers,
            },
          }),
        });
      },
    });
  },
});
