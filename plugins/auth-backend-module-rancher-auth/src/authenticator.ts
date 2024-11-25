import { AuthenticationError } from '@backstage/errors';
import { createProxyAuthenticator } from '@backstage/plugin-auth-node';
import { RancherAuthResult } from './types';

/** @public */
export const rancherAuthenticator = createProxyAuthenticator({
  defaultProfileTransform: async (result: RancherAuthResult) => {
    return {
      profile: {}
    };
  },
  initialize({ config }) {
    const serverUrl = config.getString('serverUrl');

    return { serverUrl };
  },

  async authenticate({ req }, { serverUrl }) {
    if (!serverUrl) {
      throw new AuthenticationError('Rancher authentication provider missing Rancher Server URL configuration');
    }

    const rancherToken = req.cookies.R_SESS;

    // Make a request to Rancher using the token and get the current user
    if (rancherToken) {
      const url = `${ serverUrl }/v3/users?me=true`;
      
      const headers = new Headers();
      headers.set('Authorization', 'Bearer ' + rancherToken);

      const r = await fetch(url, {
        method: 'GET',
        headers
      });

      if (r.status === 200) {
        const data = await r.json();

        if (data && data.type === 'collection' && data.data && data.data.length === 1) {
          // Got user
          const user = data.data[0];

          if (user.enabled && user.state === 'active') {
            console.error(user);

            const token = {
              user: {
                username: user.username,
                displayName: user.name,
                description: user.description,
              },
              token: rancherToken
            };

            return {
              result: token,
              providerInfo: { token },
            };
          }
        }
      }
    }

    throw new AuthenticationError('Failed to authenticate with Rancher');
  },
});
