import React from 'react';
import { SwitchField, UrlField } from '@tmz-apps/cms-js/components/index.js';
import withBlockModal from '@tmz-apps/cms-js/blocksmith/components/with-block-modal/index.js';
import ImageAssetPickerField from '@tmz-apps/cms-js/plugins/dam/components/image-asset-picker-field/index.js';

function FacebookVideoBlockModal(props) {
  const { nodeRef: containerRef } = props.containerFormContext;
  return (
    <>
      <UrlField name="href" label="Facebook Video URL" />
      <SwitchField name="autoplay" label="Autoplay" />
      <SwitchField name="show_text" label="Show Text" />
      <SwitchField name="show_captions" label="Show Captions" />
      <ImageAssetPickerField name="poster_image_ref" label="Poster Image" nodeRef={containerRef} />
    </>
  );
}

export default withBlockModal(FacebookVideoBlockModal);
