import React from 'react';
import MultiSelectField from '@tmz-apps/cms-js/components/select-field/MultiSelectField.js';
import SingleSelectField from '@tmz-apps/cms-js/components/select-field/SingleSelectField.js';

export default function SelectField({ isMulti = false, ...rest }) {
  const Component = isMulti ? MultiSelectField : SingleSelectField;
  return <Component {...rest} />;
}

