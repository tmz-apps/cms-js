import React from 'react';
import { Badge, ListGroup, ListGroupItem } from 'reactstrap';
import { Loading } from '@tmz-apps/cms-js/components/index.js';
import nodeUrl from '@tmz-apps/cms-js/plugins/ncr/nodeUrl.js';
import useNode from '@tmz-apps/cms-js/plugins/ncr/components/useNode.js';
import withBlockPreview from '@tmz-apps/cms-js/blocksmith/components/with-block-preview/index.js';

function SinglePoll(props) {
  const { nodeRef } = props;
  const { node, pbjxError } = useNode(nodeRef);

  if (!node) {
    const error = `${pbjxError}`.startsWith('NodeNotFound') ? `${nodeRef} not found.` : pbjxError;
    return <Loading inline size="sm" error={error}>Loading {nodeRef}...</Loading>;
  }

  const status = node.get('status').getValue();
  const url = nodeUrl(node, 'view');

  return (
    <ListGroupItem key={`${node.get('_id')}`}>
      <a href={url} target="_blank">
        {node.get('title')}
      </a>
      <Badge color="dark" size="sm" className={`ms-1 align-self-end status-${status}`}>{status}</Badge>
    </ListGroupItem>
  );
}

function PollGridBlockPreview(props) {
  const { block } = props;
  return (
    <ListGroup>
      {block.get('node_refs', []).map(ref => (
        <SinglePoll key={ref.getId()} nodeRef={ref} />
      ))}
    </ListGroup>
  );
}

export default withBlockPreview(PollGridBlockPreview);
