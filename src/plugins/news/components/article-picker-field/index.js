import SearchArticlesSort from '@triniti/schemas/triniti/news/enums/SearchArticlesSort.js';
import withRequest from '@tmz-apps/cms-js/plugins/pbjx/components/with-request/index.js';
import NodePickerField from '@tmz-apps/cms-js/plugins/ncr/components/node-picker-field/index.js';

export default withRequest(NodePickerField, 'triniti:news:request:search-articles-request', {
  channel: 'picker',
  initialData: {
    sort: SearchArticlesSort.ORDER_DATE_DESC.getValue(),
    autocomplete: true,
  }
});
