import React from 'react';
import SearchCategoriesSort from '@triniti/schemas/triniti/taxonomy/enums/SearchCategoriesSort.js';
import withRequest from '@tmz-apps/cms-js/plugins/pbjx/components/with-request/index.js';
import NodePickerField from '@tmz-apps/cms-js/plugins/ncr/components/node-picker-field/index.js';

function CategoryPickerField(props) {
  return <NodePickerField {...props} showImage={false} />;
}

export default withRequest(CategoryPickerField, 'triniti:taxonomy:request:search-categories-request', {
  channel: 'picker',
  initialData: {
    sort: SearchCategoriesSort.TITLE_ASC.getValue(),
    autocomplete: true,
  }
});
