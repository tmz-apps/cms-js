import React from 'react';
import SearchSponsorsSort from '@triniti/schemas/triniti/boost/enums/SearchSponsorsSort.js';
import withRequest from '@tmz-apps/cms-js/plugins/pbjx/components/with-request/index.js';
import NodePickerField from '@tmz-apps/cms-js/plugins/ncr/components/node-picker-field/index.js';

function SponsorPickerField(props) {
  return <NodePickerField {...props} showImage={false} />;
}

export default withRequest(SponsorPickerField, 'triniti:boost:request:search-sponsors-request', {
  channel: 'picker',
  initialData: {
    sort: SearchSponsorsSort.TITLE_ASC.getValue(),
    autocomplete: true,
  }
});
