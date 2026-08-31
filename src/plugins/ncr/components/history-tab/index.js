import React, { lazy, Suspense } from 'react';
import { ErrorBoundary, Loading } from '@tmz-apps/cms-js/components/index.js';

const NodeHistoryCard = lazy(() => import('@tmz-apps/cms-js/plugins/ncr/components/node-history-card/index.js'));

export default function HistoryTab(props) {
  const { tab } = props;
  if (tab !== 'history') {
    return null;
  }

  return (
    <Suspense fallback={<Loading />}>
      <ErrorBoundary>
        <NodeHistoryCard {...props} />
      </ErrorBoundary>
    </Suspense>
  );
}
