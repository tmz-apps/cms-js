import React from 'react';
import withBlockPreview from '@tmz-apps/cms-js/blocksmith/components/with-block-preview/index.js';

function FacebookVideoBlockPreview(props) {
  const { block } = props;
  return (
    <p>
      <a href={block.get('href')} target="_blank" rel="noreferrer noopener">{block.get('href')}</a>
    </p>
  );
}

export default withBlockPreview(FacebookVideoBlockPreview);
