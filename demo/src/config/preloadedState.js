import { ACCESS_TOKEN_STORAGE_KEY } from '@gdbots/pbjx/constants.js';
import isJwtExpired from '@tmz-apps/cms-js/plugins/iam/utils/isJwtExpired.js';
import { THEME_STORAGE_KEY } from '@tmz-apps/cms-js/constants.js';

export default () => {
  const preloadedState = {};//CLIENT_PRELOADED_STATE || {};
  const accessToken = localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);
  const isAuthenticated = !isJwtExpired(accessToken);

  preloadedState.app = {
    theme: localStorage.getItem(THEME_STORAGE_KEY),
  };

  preloadedState.iam = {
    accessToken: isAuthenticated ? accessToken : null,
    isAuthenticated,
  };

  return preloadedState;
};
