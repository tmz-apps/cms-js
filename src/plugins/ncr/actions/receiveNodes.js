import { actionTypes } from '@tmz-apps/cms-js/plugins/ncr/constants.js';

export default (nodes) => ({
  type: actionTypes.NODES_RECEIVED,
  nodes,
});
