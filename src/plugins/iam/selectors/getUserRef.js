import getUser from '@tmz-apps/cms-js/plugins/iam/selectors/getUser.js';

export default (state, asNodeRef = false) => {
  const user = getUser(state);
  const nodeRef = user.generateNodeRef();
  return asNodeRef ? nodeRef : nodeRef.toString();
};
