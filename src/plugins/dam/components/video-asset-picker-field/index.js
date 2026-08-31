import React from 'react';
import AssetPickerField from '@tmz-apps/cms-js/plugins/dam/components/asset-picker-field/index.js';

export default function VideoAssetPickerField(props) {
  return (
    <AssetPickerField
      {...props}
      icon="video"
      type="video-asset"
      uploaderProps={{
        accept: ['application/*', 'video/*'],
      }}
    />
  );
}
