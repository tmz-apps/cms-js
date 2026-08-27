import React from 'react';
import AzureFields from '@tmz-apps/cms-js/plugins/iam/components/app-screen/AzureFields.js';
import FirebaseFields from '@tmz-apps/cms-js/plugins/iam/components/app-screen/FirebaseFields.js';

export default function IosAppFields() {
  return (
    <>
      <FirebaseFields />
      <AzureFields />
    </>
  );
}
