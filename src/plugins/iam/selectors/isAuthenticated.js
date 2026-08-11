import getAccessToken from '@tmz-apps/cms-js/plugins/iam/selectors/getAccessToken.js';
import isJwtExpired from '@tmz-apps/cms-js/plugins/iam/utils/isJwtExpired.js';

export default (state, strict = false) => {
  if (!state.iam.isAuthenticated) {
    return false;
  }

  return strict ? !isJwtExpired(getAccessToken(state)) : true;
};
