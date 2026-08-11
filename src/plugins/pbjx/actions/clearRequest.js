import { actionTypes } from '@tmz-apps/cms-js/plugins/pbjx/constants.js';

/**
 * @param {string} curie
 * @param {string} channel
 *
 * @returns {Object}
 */
export default (curie, channel = '') => ({
  type: actionTypes.REQUEST_CLEARED,
  curie,
  channel,
});
