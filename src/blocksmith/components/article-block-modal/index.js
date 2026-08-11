import React from 'react';
import { SwitchField, TextField } from '@tmz-apps/cms-js/components/index.js';
import ArticlePickerField from '@tmz-apps/cms-js/blocksmith/components/article-block-modal/ArticlePickerField.js';
import ImageAssetPickerField from '@tmz-apps/cms-js/plugins/dam/components/image-asset-picker-field/index.js';
import withBlockModal from '@tmz-apps/cms-js/blocksmith/components/with-block-modal/index.js';
import AsideField from '@tmz-apps/cms-js/blocksmith/components/with-block-modal/AsideField.js';

function ArticleBlockModal(props) {
  const { nodeRef: containerRef } = props.containerFormContext;
  return (
    <>
      <ArticlePickerField name="node_ref" label="Article" required />
      <SwitchField name="show_image" label="Show Image" />
      <ImageAssetPickerField
        name="image_ref"
        label="Custom Image"
        description="When not set, the article's image will be used."
        nodeRef={containerRef}
      />
      <TextField name="title" label="Custom Title" description="When not set, the article's title will be used." />
      <TextField name="cta_text" label="Call To Action Text" />
      <TextField name="link_text" label="Link Text" />
      <AsideField />
    </>
  );
}

export default withBlockModal(ArticleBlockModal);
