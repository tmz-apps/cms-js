import incrementer from '@tmz-apps/cms-js/utils/incrementer.js';
import { actionTypes } from '@tmz-apps/cms-js/constants.js';

const nextId = incrementer();

export default ({ message, type = 'warning' }) => ({
  type: actionTypes.ALERT_SENT,
  alert: {
    id: nextId(),
    message,
    type,
  },
});
