import React from 'react';
import { ActionButton } from '@tmz-apps/cms-js/components/index.js';
import usePolicy from '@tmz-apps/cms-js/plugins/iam/components/usePolicy.js';
import NodeRef from '@gdbots/pbj/well-known/NodeRef.js';

export default function SaveNodeButton (props) {
  const { disabled, nodeRef, onClick: handleSave } = props;
  const policy = usePolicy();
  const canSave = policy.isGranted(`${NodeRef.fromString(nodeRef).getQName()}:update`);

  return (
    canSave ?
      <ActionButton 
        text='Save'
        onClick={handleSave}
        disabled={disabled}
        icon='save-diskette'
        color='light'
        outline
      /> : null
  );
}