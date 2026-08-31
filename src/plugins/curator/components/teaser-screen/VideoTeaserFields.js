import React from 'react';
import VideoPickerField from '@tmz-apps/cms-js/plugins/ovp/components/video-picker-field/index.js';

export default function VideoTeaserFields() {
  return (
    <VideoPickerField name="target_ref" label="Target Video" required readOnly />
  );
}
