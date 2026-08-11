import React from 'react';
import PersonPickerField from '@tmz-apps/cms-js/plugins/people/components/person-picker-field/index.js';
import withTeaserModal from '@tmz-apps/cms-js/plugins/curator/components/create-teaser-modal/withTeaserModal.js';

function PersonTeaserModal() {
  return (
    <>
      <PersonPickerField name="target_ref" label="Target Person" required />
    </>
  );
}

export default withTeaserModal(PersonTeaserModal);
