import isAuthenticated from '@tmz-apps/cms-js/plugins/iam/selectors/isAuthenticated.js';
import getAccessToken from '@tmz-apps/cms-js/plugins/iam/selectors/getAccessToken.js';
import { methods, serviceIds } from '@tmz-apps/cms-js/plugins/raven/constants.js';

export default (userRef) => async (dispatch, getState, app) => {
  if (!app.has(serviceIds.RAVEN_WORKER)) {
    return;
  }

  const state = getState();
  if (!isAuthenticated(state, true)) {
    return;
  }

  const accessToken = getAccessToken(state);
  const raven = await app.get(serviceIds.RAVEN_WORKER);
  raven.postMessage({ method: methods.CONNECT, accessToken, userRef });
};
