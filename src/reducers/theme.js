import createReducer from '@tmz-apps/cms-js/utils/createReducer.js';
import { actionTypes } from '@tmz-apps/cms-js/constants.js';

export const initialState = 'theme-light';

const onThemeChanged = (state, action) => action.theme;

export default createReducer(initialState, {
  [actionTypes.THEME_CHANGED]: onThemeChanged,
});
