import SearchPeopleSort from '@triniti/schemas/triniti/people/enums/SearchPeopleSort.js';
import withRequest from '@tmz-apps/cms-js/plugins/pbjx/components/with-request/index.js';
import NodePickerField from '@tmz-apps/cms-js/plugins/ncr/components/node-picker-field/index.js';

export default withRequest(NodePickerField, 'triniti:people:request:search-people-request', {
  channel: 'picker',
  initialData: {
    sort: SearchPeopleSort.TITLE_ASC.getValue(),
    autocomplete: true,
  }
});
