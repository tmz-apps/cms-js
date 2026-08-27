import React from 'react';
import PicklistField from '@tmz-apps/cms-js/plugins/sys/components/picklist-field/index.js';
import withNotificationModal from '@tmz-apps/cms-js/plugins/notify/components/create-notification-modal/withNotificationModal.js';

function AndroidNotificationModal() {
  return (
    <>
      <PicklistField picklist="android-notification-fcm-topics" name="fcm_topics" label="FCM Topics" isMulti />
    </>
  );
}

export default withNotificationModal(AndroidNotificationModal);
