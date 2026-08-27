import MessageResolver from './schemas.js';
import App from '@tmz-apps/cms-js/App.js';
import CanvasPlugin from '@tmz-apps/cms-js/plugins/canvas/index.js';
import CommonPlugin from '@tmz-apps/cms-js/plugins/common/index.js';
import CuratorPlugin from '@tmz-apps/cms-js/plugins/curator/index.js';
import DamPlugin from '@tmz-apps/cms-js/plugins/dam/index.js';
import IamPlugin from '@tmz-apps/cms-js/plugins/iam/index.js';
import NcrPlugin from '@tmz-apps/cms-js/plugins/ncr/index.js';
import NewsPlugin from '@tmz-apps/cms-js/plugins/news/index.js';
import NotifyPlugin from '@tmz-apps/cms-js/plugins/notify/index.js';
import OvpPlugin from '@tmz-apps/cms-js/plugins/ovp/index.js';
import PbjxPlugin from '@tmz-apps/cms-js/plugins/pbjx/index.js';
import PeoplePlugin from '@tmz-apps/cms-js/plugins/people/index.js';
import RavenPlugin from '@tmz-apps/cms-js/plugins/raven/index.js';
import SysPlugin from '@tmz-apps/cms-js/plugins/sys/index.js';
import TaxonomyPlugin from '@tmz-apps/cms-js/plugins/taxonomy/index.js';
import createPreloadedState from './config/preloadedState.js';

const plugins = [
  new CanvasPlugin,
  new CommonPlugin,
  new CuratorPlugin,
  new DamPlugin,
  new IamPlugin,
  new NcrPlugin,
  new NewsPlugin,
  new NotifyPlugin,
  new OvpPlugin,
  new PbjxPlugin,
  new PeoplePlugin,
  new RavenPlugin,
  new SysPlugin,
  new TaxonomyPlugin,
];

export default async () => {
  const preloadedState = createPreloadedState();
  const app = new App(plugins, preloadedState);
  app.schemas = MessageResolver;
  return app;
};
