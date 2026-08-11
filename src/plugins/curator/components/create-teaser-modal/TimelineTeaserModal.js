import React from 'react';
import TimelinePickerField from '@tmz-apps/cms-js/plugins/curator/components/timeline-picker-field/index.js';
import withTeaserModal from '@tmz-apps/cms-js/plugins/curator/components/create-teaser-modal/withTeaserModal.js';

function TimelineTeaserModal() {
  return (
    <>
      <TimelinePickerField name="target_ref" label="Target Timeline" required />
    </>
  );
}

export default withTeaserModal(TimelineTeaserModal);
