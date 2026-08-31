import { actionTypes } from '@tmz-apps/cms-js/constants.js';

export default (primary, secondary) => {
  return { type: actionTypes.NAVBAR_CHANGED, primary, secondary };
};
