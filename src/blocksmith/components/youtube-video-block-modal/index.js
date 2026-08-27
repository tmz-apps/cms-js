import React from 'react';
import { NumberField, SwitchField, TextField } from '@tmz-apps/cms-js/components/index.js';
import ImageAssetPickerField from '@tmz-apps/cms-js/plugins/dam/components/image-asset-picker-field/index.js';
import withBlockModal from '@tmz-apps/cms-js/blocksmith/components/with-block-modal/index.js';
import parseYouTubeId from '@tmz-apps/cms-js/utils/parseYouTubeId.js';

function YoutubeVideoBlockModal(props) {
  const { nodeRef: containerRef } = props.containerFormContext;
  return (
    <>
      <TextField
        name="id"
        label="YouTube Video ID"
        parse={parseYouTubeId}
        required
        placeholder="Paste in a YouTube URL or Video ID"
      />
      <SwitchField name="autoplay" label="Autoplay" />
      <NumberField name="start_at" label="Start At" description="Measured in seconds." />
      <ImageAssetPickerField name="poster_image_ref" label="Poster Image" nodeRef={containerRef} />
    </>
  );
}

export default withBlockModal(YoutubeVideoBlockModal);
