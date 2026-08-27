import { combineReducers } from 'redux';
import alerts from '@tmz-apps/cms-js/reducers/alerts.js';
import forms from '@tmz-apps/cms-js/reducers/forms.js';
import navbar from '@tmz-apps/cms-js/reducers/navbar.js';
import theme from '@tmz-apps/cms-js/reducers/theme.js';

export default combineReducers({
  alerts,
  forms,
  navbar,
  theme,
});
