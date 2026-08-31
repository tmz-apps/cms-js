import { ACCESS_TOKEN_STORAGE_KEY } from '@gdbots/pbjx/constants.js';
import { actionTypes } from '@tmz-apps/cms-js/plugins/iam/constants.js';

export default () => {
  localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
  return { type: actionTypes.LOGIN_REJECTED };
};
