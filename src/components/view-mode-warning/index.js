import React from 'react';
import { Alert } from 'reactstrap';
import Icon from '@tmz-apps/cms-js/components/icon/index.js';

export default function ViewModeWarning() {
  return (
    <Alert color="warning" className="alert-inverse" fade={false}>
      <span><Icon imgSrc="warning-outline" /> {'You\'re in'} <strong>View Mode</strong></span>
    </Alert>
  );
}
