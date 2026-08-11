import React from 'react';
import { TextField, UrlField } from '@tmz-apps/cms-js/components/index.js';
import AudioAssetPickerField from '@tmz-apps/cms-js/plugins/dam/components/audio-asset-picker-field/index.js';
import ImageAssetPickerField from '@tmz-apps/cms-js/plugins/dam/components/image-asset-picker-field/index.js';
import withBlockModal from '@tmz-apps/cms-js/blocksmith/components/with-block-modal/index.js';
import AsideField from '@tmz-apps/cms-js/blocksmith/components/with-block-modal/AsideField.js';

function AudioBlockModal(props) {
  const { nodeRef: containerRef } = props.containerFormContext;
  return (
    <>
      <AudioAssetPickerField name="node_ref" label="Audio" required nodeRef={containerRef} />
      <ImageAssetPickerField name="image_ref" label="Poster Image" nodeRef={containerRef} />
      <TextField name="title" label="Custom Title" description="When not set, the audio's title will be used." />
      <TextField name="launch_text" label="Launch Text" />
      <UrlField
        name="fallback_src_url"
        label="Fallback Source URL"
        description="For imported audio blocks that are hosted externally."
      />
      <AsideField />
    </>
  );
}

export default withBlockModal(AudioBlockModal);
