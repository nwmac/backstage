import {
  createSignInResolverFactory,
  SignInInfo,
} from '@backstage/plugin-auth-node';

import { RancherAuthResult } from './types';

/**
 * Available sign-in resolvers for the Google auth provider.
 *
 * @public
 */
export namespace rancherSignInResolvers {
  /**
   * Looks up the user by matching their email to the `google.com/email` annotation.
   */
  export const emailMatchingUserEntityAnnotation = createSignInResolverFactory({
    create() {
      return async (info: SignInInfo<RancherAuthResult>, ctx) => {
        throw new Error('Can not resolve by email');
      };
    },
  });

  /**
   * Looks up the user by matching their user ID to the User entity with the appropriate annotation
   */
  export const idMatchingUserEntityAnnotation = createSignInResolverFactory({
    create() {
      return async (info: SignInInfo<RancherAuthResult>, ctx) => {
        const username = info.result?.user?.username;

        if (username) {
          return ctx.signInWithCatalogUser({ annotations: { 'cattle.io/user-id': username }});
        }

        throw new Error('Invalid login');
      };
    },
  });
}
