import SearchTeasersSort from '@triniti/schemas/triniti/curator/enums/SearchTeasersSort.js';
import withRequest from '@tmz-apps/cms-js/plugins/pbjx/components/with-request/index.js';
import NodePickerField from '@tmz-apps/cms-js/plugins/ncr/components/node-picker-field/index.js';

export default withRequest(NodePickerField, 'triniti:curator:request:search-teasers-request', {
  channel: 'picker',
  initialData: {
    sort: SearchTeasersSort.ORDER_DATE_DESC.getValue(),
    autocomplete: true,
  }
});
