import isAuthenticated from '@tmz-apps/cms-js/plugins/iam/selectors/isAuthenticated.js';
import getAccessToken from '@tmz-apps/cms-js/plugins/iam/selectors/getAccessToken.js';
import getUserRef from '@tmz-apps/cms-js/plugins/iam/selectors/getUserRef.js';
import { methods, serviceIds } from '@tmz-apps/cms-js/plugins/raven/constants.js';

export default (nodeRef) => async (dispatch, getState, app) => {
  if (!app.has(serviceIds.RAVEN_WORKER)) {
    return;
  }

  const state = getState();
  if (!isAuthenticated(state, true)) {
    return;
  }

  const raven = await app.get(serviceIds.RAVEN_WORKER);
  const accessToken = getAccessToken(state);
  const userRef = getUserRef(state);

  raven.postMessage({ method: methods.SET_TOKEN, userRef, accessToken });
  raven.postMessage({ method: methods.SUBSCRIBE, nodeRef });
};
