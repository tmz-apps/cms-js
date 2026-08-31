import SearchVideosSort from '@triniti/schemas/triniti/ovp/enums/SearchVideosSort.js';
import withRequest from '@tmz-apps/cms-js/plugins/pbjx/components/with-request/index.js';
import NodePickerField from '@tmz-apps/cms-js/plugins/ncr/components/node-picker-field/index.js';

export default withRequest(NodePickerField, 'triniti:ovp:request:search-videos-request', {
  channel: 'picker',
  initialData: {
    sort: SearchVideosSort.ORDER_DATE_DESC.getValue(),
    autocomplete: true,
  }
});
