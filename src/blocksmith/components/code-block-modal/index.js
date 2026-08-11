import React from 'react';
import { TextareaField } from '@tmz-apps/cms-js/components/index.js';
import withBlockModal from '@tmz-apps/cms-js/blocksmith/components/with-block-modal/index.js';

function CodeBlockModal() {
  return <TextareaField name="code" label="Code" required rows={10} />;
}

export default withBlockModal(CodeBlockModal);
