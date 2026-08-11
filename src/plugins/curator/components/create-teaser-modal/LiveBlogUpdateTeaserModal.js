import React from 'react';
import { TextField } from '@tmz-apps/cms-js/components/index.js';
import TimelinePickerField from '@tmz-apps/cms-js/plugins/curator/components/timeline-picker-field/index.js';
import withTeaserModal from '@tmz-apps/cms-js/plugins/curator/components/create-teaser-modal/withTeaserModal.js';

function LiveBlogUpdateTeaserModal() {
  return (
    <>
      <TextField name="title" label="Title" required />
      <TimelinePickerField name="timeline_ref" label="Timeline" required />
    </>
  );
}

export default withTeaserModal(LiveBlogUpdateTeaserModal);
