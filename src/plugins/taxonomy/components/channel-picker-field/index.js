import React from 'react';
import SearchChannelsSort from '@triniti/schemas/triniti/taxonomy/enums/SearchChannelsSort.js';
import withRequest from '@tmz-apps/cms-js/plugins/pbjx/components/with-request/index.js';
import NodePickerField from '@tmz-apps/cms-js/plugins/ncr/components/node-picker-field/index.js';

function ChannelPickerField(props) {
  return <NodePickerField {...props} showImage={false} />;
}

export default withRequest(ChannelPickerField, 'triniti:taxonomy:request:search-channels-request', {
  channel: 'picker',
  initialData: {
    sort: SearchChannelsSort.TITLE_ASC.getValue(),
    autocomplete: true,
  }
});
