import Plugin from '@tmz-apps/cms-js/Plugin.js';
import reducer from '@tmz-apps/cms-js/plugins/iam/reducers/index.js';
import { serviceIds } from '@tmz-apps/cms-js/plugins/iam/constants.js';

export default class IamPlugin extends Plugin {
  constructor() {
    super('triniti', 'iam');
  }

  async configure(app) {
    this.reducer = reducer;

    app.register(serviceIds.AUTHORIZER, async () => {
      const Authorizer = (await import('@tmz-apps/cms-js/plugins/iam/Authorizer.js')).default;
      return new Authorizer(app);
    });

    app.subscribe('gdbots:pbjx:mixin:command.validate', serviceIds.AUTHORIZER, 'checkPermission');
    app.subscribe('gdbots:pbjx:mixin:request.validate', serviceIds.AUTHORIZER, 'checkPermission');
  }
}
