import React from 'react';
import { SwitchField } from '@tmz-apps/cms-js/components/index.js';
import PicklistField from '@tmz-apps/cms-js/plugins/sys/components/picklist-field/index.js';
import withNotificationModal from '@tmz-apps/cms-js/plugins/notify/components/create-notification-modal/withNotificationModal.js';

function BrowserNotificationModal() {
  return (
    <>
      <PicklistField picklist="browser-notification-fcm-topics" name="fcm_topics" label="FCM Topics" isMulti />
      <SwitchField name="require_interaction" label="Require Interaction" />
    </>
  );
}

export default withNotificationModal(BrowserNotificationModal);
