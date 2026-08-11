import React from 'react';
import startCase from 'lodash-es/startCase.js';
import NotificationSendStatus from '@triniti/schemas/triniti/notify/enums/NotificationSendStatus.js';
import { EnumField } from '@tmz-apps/cms-js/components/index.js';
import Option from '@tmz-apps/cms-js/plugins/notify/components/notification-send-status-field/Option.js';
import SingleValue from '@tmz-apps/cms-js/plugins/notify/components/notification-send-status-field/SingleValue.js';

const filter = option => option.value !== 'unknown';
const format = label => startCase(label.toLowerCase());

const components = { Option, SingleValue };

export default function NotificationSendStatusField(props) {
  return <EnumField
    enumClass={NotificationSendStatus}
    filter={filter}
    format={format}
    name="send_status"
    placeholder="Select Status:"
    components={components}
    {...props}
  />;
}
