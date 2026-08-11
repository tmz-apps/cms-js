import React from 'react';
import { SwitchField, UrlField } from '@tmz-apps/cms-js/components/index.js';
import withBlockModal from '@tmz-apps/cms-js/blocksmith/components/with-block-modal/index.js';

function FacebookPostBlockModal() {
  return (
    <>
      <UrlField name="href" label="Facebook Post URL" />
      <SwitchField name="show_text" label="Show Text" />
    </>
  );
}

export default withBlockModal(FacebookPostBlockModal);
