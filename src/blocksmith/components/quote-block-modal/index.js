import React from 'react';
import { SwitchField, TextareaField, TextField, UrlField } from '@tmz-apps/cms-js/components/index.js';
import withBlockModal from '@tmz-apps/cms-js/blocksmith/components/with-block-modal/index.js';

function QuoteBlockModal() {
  return (
    <>
      <TextareaField name="text" label="Text" required />
      <TextField name="source" label="Source" />
      <UrlField name="source_url" label="Source URL" />
      <SwitchField name="is_pull_quote" label="Is Pull Quote" />
    </>
  );
}

export default withBlockModal(QuoteBlockModal);
