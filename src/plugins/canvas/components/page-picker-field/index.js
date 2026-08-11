import SearchPagesSort from '@triniti/schemas/triniti/canvas/enums/SearchPagesSort.js';
import withRequest from '@tmz-apps/cms-js/plugins/pbjx/components/with-request/index.js';
import NodePickerField from '@tmz-apps/cms-js/plugins/ncr/components/node-picker-field/index.js';

export default withRequest(NodePickerField, 'triniti:canvas:request:search-pages-request', {
  channel: 'picker',
  initialData: {
    sort: SearchPagesSort.ORDER_DATE_DESC.getValue(),
    autocomplete: true,
  }
});
