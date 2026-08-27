import React from 'react';
import { TextField, UrlField } from '@tmz-apps/cms-js/components/index.js';
import withTeaserModal from '@tmz-apps/cms-js/plugins/curator/components/create-teaser-modal/withTeaserModal.js';

function LinkTeaserModal() {
  return (
    <>
      <TextField name="title" label="Title" required />
      <UrlField name="link_url" label="Link URL" required />
    </>
  );
}

export default withTeaserModal(LinkTeaserModal);
