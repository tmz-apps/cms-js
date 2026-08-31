import React from 'react';
import SearchRedirectsSort from '@triniti/schemas/triniti/sys/enums/SearchRedirectsSort.js';
import withRequest from '@tmz-apps/cms-js/plugins/pbjx/components/with-request/index.js';
import NodePickerField from '@tmz-apps/cms-js/plugins/ncr/components/node-picker-field/index.js';

function RedirectPickerField(props) {
  return <NodePickerField {...props} showImage={false} />;
}

export default withRequest(RedirectPickerField, 'triniti:sys:request:search-redirects-request', {
  channel: 'picker',
  initialData: {
    sort: SearchRedirectsSort.TITLE_ASC.getValue(),
    autocomplete: true,
  }
});
