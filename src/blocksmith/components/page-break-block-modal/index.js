import React from 'react';
import { TextField } from '@tmz-apps/cms-js/components/index.js';
import withBlockModal from '@tmz-apps/cms-js/blocksmith/components/with-block-modal/index.js';

function PageBreakBlockModal() {
  return (
    <>
      <TextField name="read_more_text" label="Read More Text" />
    </>
  );
}

export default withBlockModal(PageBreakBlockModal);
