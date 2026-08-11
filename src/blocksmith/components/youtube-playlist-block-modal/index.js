import React from 'react';
import { SwitchField, TextField } from '@tmz-apps/cms-js/components/index.js';
import ImageAssetPickerField from '@tmz-apps/cms-js/plugins/dam/components/image-asset-picker-field/index.js';
import withBlockModal from '@tmz-apps/cms-js/blocksmith/components/with-block-modal/index.js';

function YoutubePlaylistBlockModal(props) {
  const { nodeRef: containerRef } = props.containerFormContext;
  return (
    <>
      <TextField name="playlist_id" label="YouTube Playlist ID" required />
      <TextField name="video_id" label="YouTube Video ID" />
      <SwitchField name="autoplay" label="Autoplay" />
      <ImageAssetPickerField name="poster_image_ref" label="Poster Image" nodeRef={containerRef} />
    </>
  );
}

export default withBlockModal(YoutubePlaylistBlockModal);
