import React from 'react';
import { UrlField } from '@tmz-apps/cms-js/components/index.js';
import withBlockModal from '@tmz-apps/cms-js/blocksmith/components/with-block-modal/index.js';

function TumblrPostBlockModal() {
  return (
    <>
      <UrlField name="href" label="Tumblr URL" required />
      <UrlField name="canonical_url" label="Tumblr Canonical URL" />
    </>
  );
}

export default withBlockModal(TumblrPostBlockModal);
