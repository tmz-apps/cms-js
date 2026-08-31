import React from 'react';
import { SwitchField } from '@tmz-apps/cms-js/components/index.js';

export default function AsideField() {
  return (
    <SwitchField
      name="aside"
      label="Aside"
      description="This block is indirectly related to the main content."
    />
  );
}
