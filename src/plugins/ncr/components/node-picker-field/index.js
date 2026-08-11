import React from 'react';
import MultiSelectField from '@tmz-apps/cms-js/plugins/ncr/components/node-picker-field/MultiSelectField.js';
import SingleSelectField from '@tmz-apps/cms-js/plugins/ncr/components/node-picker-field/SingleSelectField.js';

export default function NodePickerField({ isMulti = false, ...rest }) {
  const Component = isMulti ? MultiSelectField : SingleSelectField;
  return <Component {...rest} />;
}
