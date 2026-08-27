import NodeRef from '@gdbots/pbj/well-known/NodeRef.js';
import isAuthenticated from '@tmz-apps/cms-js/plugins/iam/selectors/isAuthenticated.js';
import getAccessToken from '@tmz-apps/cms-js/plugins/iam/selectors/getAccessToken.js';
import getUserRef from '@tmz-apps/cms-js/plugins/iam/selectors/getUserRef.js';
import getNode from '@tmz-apps/cms-js/plugins/ncr/selectors/getNode.js';
import shouldShowStaleDataWarning from '@tmz-apps/cms-js/plugins/raven/utils/shouldShowStaleDataWarning.js';
import showStaleDataWarning from '@tmz-apps/cms-js/plugins/raven/utils/showStaleDataWarning.js';
import { actionTypes, methods, serviceIds } from '@tmz-apps/cms-js/plugins/raven/constants.js';

export default (nodeRef) => async (dispatch, getState, app) => {
  if (!app.has(serviceIds.RAVEN_WORKER)) {
    return;
  }

  const state = getState();
  if (!isAuthenticated(state, true)) {
    return;
  }

  const raven = await app.get(serviceIds.RAVEN_WORKER);
  const server = await app.get(serviceIds.RAVEN_SERVER);

  const accessToken = getAccessToken(state);
  const userRef = getUserRef(state);
  raven.postMessage({ method: methods.SET_TOKEN, userRef, accessToken });

  const action = { method: methods.HEARTBEAT, nodeRef, ts: Math.floor(Date.now() / 1000) };
  raven.postMessage(action);
  const data = await server.heartbeat(action);

  if (data.ok) {
    const node = getNode(state, nodeRef);
    if (shouldShowStaleDataWarning(data.last_event_ref, data.etag, node)) {
      const ref = NodeRef.fromString(`${nodeRef}`);
      const updaterRef = data.updater_ref ? NodeRef.fromString(data.updater_ref) : '';
      let username = 'SYSTEM';
      if (updaterRef) {
        const user = getNode(state, updaterRef);
        if (user) {
          username = user.get('title');
        }
      }

      await showStaleDataWarning(ref, username);
    }

    Object.entries(data.collaborators || {}).forEach(([key, ts]) => {
      if (key === userRef) {
        return;
      }

      dispatch({ type: actionTypes.HEARTBEAT, userRef: key, nodeRef, ts });
    });
  }
};
