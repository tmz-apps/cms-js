import React from 'react';
import SearchWidgetsSort from '@triniti/schemas/triniti/curator/enums/SearchWidgetsSort.js';
import withRequest from '@tmz-apps/cms-js/plugins/pbjx/components/with-request/index.js';
import NodePickerField from '@tmz-apps/cms-js/plugins/ncr/components/node-picker-field/index.js';

function WidgetPickerField(props) {
  return <NodePickerField {...props} showImage={false} showType />;
}

export default withRequest(WidgetPickerField, 'triniti:curator:request:search-widgets-request', {
  channel: 'picker',
  initialData: {
    sort: SearchWidgetsSort.TITLE_ASC.getValue(),
    autocomplete: true,
  }
});
