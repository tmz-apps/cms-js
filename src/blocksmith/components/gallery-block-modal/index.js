import React from 'react';
import { Badge } from 'reactstrap';
import { useFormState } from 'react-final-form';
import { SwitchField, TextField } from '@tmz-apps/cms-js/components/index.js';
import AspectRatioField from '@tmz-apps/cms-js/plugins/common/components/aspect-ratio-field/index.js';
import GalleryPickerField from '@tmz-apps/cms-js/blocksmith/components/gallery-block-modal/GalleryPickerField.js';
import ImageAssetPickerField from '@tmz-apps/cms-js/plugins/dam/components/image-asset-picker-field/index.js';
import useNode from '@tmz-apps/cms-js/plugins/ncr/components/useNode.js';
import withBlockModal from '@tmz-apps/cms-js/blocksmith/components/with-block-modal/index.js';
import AsideField from '@tmz-apps/cms-js/blocksmith/components/with-block-modal/AsideField.js';

function GalleryBlockModal(props) {
  const { nodeRef: containerRef } = props.containerFormContext;
  const { values = {} } = useFormState({ subscription: { values: true } });
  const { node } = useNode(values.node_ref);
  // useNode keeps the previous node while a new ref loads or after the ref is cleared
  const gallery = node && `${node.generateNodeRef()}` === values.node_ref ? node : null;
  const galleryLaunchText = gallery ? gallery.get('launch_text', '') : '';
  const hasCustomLaunchText = !!values.launch_text?.trim();
  const showLaunchTextPill = hasCustomLaunchText || !values.node_ref || !!gallery;

  let launchTextPill = 'NO GALLERY LAUNCH TEXT';
  if (hasCustomLaunchText) {
    launchTextPill = 'CUSTOM';
  } else if (galleryLaunchText) {
    launchTextPill = 'PREFILLED FROM GALLERY';
  }

  const launchTextLabel = (
    <>
      Launch Text
      {showLaunchTextPill && <Badge className="ms-1" color="light" pill>{launchTextPill}</Badge>}
    </>
  );

  return (
    <>
      <GalleryPickerField name="node_ref" label="Gallery" required />
      <ImageAssetPickerField
        name="poster_image_ref"
        label="Poster Image"
        description="When not set, the gallery's image will be used."
        nodeRef={containerRef}
        galleryRef={values.node_ref}
      />
      <div className="d-flex gap-4">
        <SwitchField name="start_at_poster" label="Start At Poster" />
        <AsideField description={null} />
      </div>
      <TextField
        name="launch_text"
        label={launchTextLabel}
        placeholder={galleryLaunchText}
      />
      <AspectRatioField />
      <TextField name="title" label="Custom Title" description="When not set, the gallery's title will be used." />
    </>
  );
}

export default withBlockModal(GalleryBlockModal);
