import React from 'react';
import PollPickerField from '@tmz-apps/cms-js/plugins/apollo/components/poll-picker-field/index.js';

export default function PollTeaserFields() {
  return (
    <PollPickerField name="target_ref" label="Target Poll" required readOnly />
  );
}
