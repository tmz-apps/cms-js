import React from 'react';
import { NumberField, SwitchField, TextField } from '@tmz-apps/cms-js/components/index.js';
import VideoPickerField from '@tmz-apps/cms-js/blocksmith/components/video-block-modal/VideoPickerField.js';
import ImageAssetPickerField from '@tmz-apps/cms-js/plugins/dam/components/image-asset-picker-field/index.js';
import withBlockModal from '@tmz-apps/cms-js/blocksmith/components/with-block-modal/index.js';

function VideoBlockModal(props) {
  const { nodeRef: containerRef } = props.containerFormContext;
  return (
    <>
      <VideoPickerField name="node_ref" label="Video" required />
      <SwitchField name="autoplay" label="Autoplay" />
      <SwitchField name="muted" label="Muted" />
      <NumberField name="start_at" label="Start At" description="Measured in seconds." />
      <ImageAssetPickerField name="poster_image_ref" label="Poster Image" nodeRef={containerRef} />
      <TextField name="title" label="Custom Title" description="When not set, the videos's title will be used." />
      <TextField name="launch_text" label="Launch Text" description="When not set, the videos's launch text will be used." />
      <SwitchField name="show_more_videos" label="Show More Videos" />
    </>
  );
}

export default withBlockModal(VideoBlockModal);
