import React from 'react';
import PollPickerField from '@tmz-apps/cms-js/plugins/apollo/components/poll-picker-field/index.js';
import withBlockModal from '@tmz-apps/cms-js/blocksmith/components/with-block-modal/index.js';

function PollGridBlockModal() {
  return (
    <>
      <PollPickerField name="node_refs" label="Polls" required isMulti sortable />
    </>
  );
}

export default withBlockModal(PollGridBlockModal);
