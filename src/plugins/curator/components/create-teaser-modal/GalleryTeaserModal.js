import React from 'react';
import GalleryPickerField from '@tmz-apps/cms-js/plugins/curator/components/gallery-picker-field/index.js';
import withTeaserModal from '@tmz-apps/cms-js/plugins/curator/components/create-teaser-modal/withTeaserModal.js';

function GalleryTeaserModal() {
  return (
    <>
      <GalleryPickerField name="target_ref" label="Target Gallery" required />
    </>
  );
}

export default withTeaserModal(GalleryTeaserModal);
