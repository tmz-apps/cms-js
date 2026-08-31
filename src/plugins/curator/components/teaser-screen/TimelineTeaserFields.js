import React from 'react';
import TimelinePickerField from '@tmz-apps/cms-js/plugins/curator/components/timeline-picker-field/index.js';

export default function TimelineTeaserFields() {
  return (
    <TimelinePickerField name="target_ref" label="Target Timeline" required readOnly />
  );
}
