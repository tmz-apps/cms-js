import React from 'react';
import Loading from '@tmz-apps/cms-js/components/loading/index.js';
import useResolver from '@tmz-apps/cms-js/components/with-pbj/useResolver.js';

export { useResolver };

export default function withPbj(Component, curie, initialData = {}) {
  return function ComponentWithPbj(props) {
    const pbj = useResolver(curie, initialData);

    if (!pbj) {
      return <Loading />;
    }

    return <Component {...props} pbj={pbj} />;
  };
}
