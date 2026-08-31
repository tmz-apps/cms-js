import React, { lazy, Suspense } from 'react';
import { ErrorBoundary, Loading } from '@tmz-apps/cms-js/components/index.js';

const RolesForm = lazy(() => import('@tmz-apps/cms-js/plugins/iam/components/user-screen/RolesForm.js'));

export default function RolesTab(props) {
  const { tab } = props;
  if (tab !== 'roles') {
    return null;
  }

  return (
    <Suspense fallback={<Loading />}>
      <ErrorBoundary>
        <RolesForm {...props} />
      </ErrorBoundary>
    </Suspense>
  );
}
