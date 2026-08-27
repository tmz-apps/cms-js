import React from 'react';
import GalleryPickerField from '@tmz-apps/cms-js/plugins/curator/components/gallery-picker-field/index.js';

export default function GalleryTeaserFields() {
  return (
    <GalleryPickerField name="target_ref" label="Target Gallery" required readOnly />
  );
}
