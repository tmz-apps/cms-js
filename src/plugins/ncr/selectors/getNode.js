import hasNode from '@tmz-apps/cms-js/plugins/ncr/selectors/hasNode.js';

export default (state, nodeRef) => {
  if (!hasNode(state, nodeRef)) {
    return null;
  }

  return state.ncr[`${nodeRef}`];
};
