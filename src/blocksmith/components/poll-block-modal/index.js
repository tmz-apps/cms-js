import React from 'react';
import { TextField } from '@tmz-apps/cms-js/components/index.js';
import PollPickerField from '@tmz-apps/cms-js/plugins/apollo/components/poll-picker-field/index.js';
import withBlockModal from '@tmz-apps/cms-js/blocksmith/components/with-block-modal/index.js';

function PollBlockModal() {
  return (
    <>
      <PollPickerField name="node_ref" label="Poll" required />
      <TextField name="title" label="Custom Title" description="When not set, the poll's title will be used." />
    </>
  );
}

export default withBlockModal(PollBlockModal);
