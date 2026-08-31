import React from 'react';
import { SelectField, TextField } from '@tmz-apps/cms-js/components/index.js';
import withBlockModal from '@tmz-apps/cms-js/blocksmith/components/with-block-modal/index.js';

const colors = [
  { label: 'primary', value: 'primary' },
  { label: 'secondary', value: 'secondary' },
];

const styles = [
  { label: 'solid', value: 'solid' },
  { label: 'dotted', value: 'dotted' },
  { label: 'dashed', value: 'dashed' },
];

function DividerBlockModal() {
  return (
    <>
      <TextField name="text" label="Text" />
      <SelectField name="stroke_color" label="Color" options={colors} isClearable={false} />
      <SelectField name="stroke_style" label="Style" options={styles} isClearable={false} />
    </>
  );
}

export default withBlockModal(DividerBlockModal);
