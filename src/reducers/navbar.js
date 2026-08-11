import createReducer from '@tmz-apps/cms-js/utils/createReducer.js';
import { actionTypes } from '@tmz-apps/cms-js/constants.js';

export const initialState = {
  primary: 'dashboard',
  secondary: '',
};

const onNavbarChanged = (prevState, action) => {
  return { primary: action.primary, secondary: action.secondary };
}

export default createReducer(initialState, {
  [actionTypes.NAVBAR_CHANGED]: onNavbarChanged,
});
