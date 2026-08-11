import Plugin from '@tmz-apps/cms-js/Plugin.js';
import { serviceIds } from '@tmz-apps/cms-js/plugins/news/constants.js';

export default class NewsPlugin extends Plugin {
  constructor() {
    super('triniti', 'news');
  }

  async configure(app) {
    app.register(serviceIds.HEADLINE_FRAGMENTS_SUBSCRIBER, async () => {
      const HeadlineFragmentsSubscriber = (await import('@tmz-apps/cms-js/plugins/news/HeadlineFragmentsSubscriber.js')).default;
      return new HeadlineFragmentsSubscriber();
    });

    app.subscribe('triniti:news:mixin:headline-fragments.init_form', serviceIds.HEADLINE_FRAGMENTS_SUBSCRIBER, 'initForm');
    app.subscribe('triniti:news:mixin:headline-fragments.validate', serviceIds.HEADLINE_FRAGMENTS_SUBSCRIBER, 'validate');
  }
}
