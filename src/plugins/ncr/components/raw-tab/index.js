import React from 'react';
import RawPbj from '@tmz-apps/cms-js/components/raw-pbj/index.js';

export default function RawTab({ node, tab }) {
  if (tab !== 'raw') {
    return null;
  }

  return <RawPbj pbj={node} />;
}
