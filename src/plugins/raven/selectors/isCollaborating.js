import getUserRef from '@tmz-apps/cms-js/plugins/iam/selectors/getUserRef.js';

export default (state, nodeRef) => {
  const userRef = getUserRef(state);
  if (!userRef || !state.raven.collaborations[nodeRef]) {
    return false;
  }
  return !!state.raven.collaborations[nodeRef][userRef];
};
