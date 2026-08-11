import React from 'react';
import { Badge, Card, Table } from 'reactstrap';
import { ActionButton } from '@tmz-apps/cms-js/components/index.js';
import formatBytes from '@tmz-apps/cms-js/utils/formatBytes.js';
import formatDate from '@tmz-apps/cms-js/utils/formatDate.js';
import nodeUrl from '@tmz-apps/cms-js/plugins/ncr/nodeUrl.js';

export default function AssetTable(props) {
  const { nodes, onSelectAsset } = props;

  return (
    <Card>
      <Table hover responsive>
        <thead>
        <tr>
          <th>Title</th>
          <th>Mime Type</th>
          <th>File Size</th>
          <th>Created At</th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        {nodes.map(node => {
          const nodeRef = node.generateNodeRef();
          const transcodingStatus = `${node.get('transcoding_status', '')}`;

          return (
            <tr key={`${node.get('_id')}`} className={`status-${node.get('status')}`}>
              <td>
                <a href={nodeUrl(node, 'view')} target="_blank" rel="noopener noreferrer">{node.get('title')}</a>
                {transcodingStatus && (
                  <Badge pill className={`ms-1 status-${transcodingStatus}`}>Transcoding:{transcodingStatus}</Badge>
                )}
              </td>
              <td className="text-nowrap d-none d-sm-table-cell">{node.get('mime_type')}</td>
              <td>{formatBytes(node.get('file_size'))}</td>
              <td className="td-date">{formatDate(node.get('created_at'))}</td>
              <td className="td-icons">
                <ActionButton
                  text="Select"
                  onClick={() => onSelectAsset(nodeRef)}
                  icon="save"
                  color="light"
                  outline
                  tag="span"
                  size="sm"
                />
              </td>
            </tr>
          );
        })}
        </tbody>
      </Table>
    </Card>
  );
}
