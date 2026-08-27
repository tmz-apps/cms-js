import LogicException from '@tmz-apps/cms-js/exceptions/LogicException.js';

export default class FormNotFound extends LogicException {
  /**
   * @param {string} formName
   */
  constructor(formName) {
    super(`Form [${formName}] was not found.`);
    this.formName = formName;
  }

  /**
   * @returns {string}
   */
  getFormName() {
    return this.formName;
  }
}
