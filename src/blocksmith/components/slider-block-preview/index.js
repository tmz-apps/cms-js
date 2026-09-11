import React from 'react';
import { Badge, Table } from 'reactstrap';
import useNode from '@tmz-apps/cms-js/plugins/ncr/components/useNode.js';
import nodeUrl from '@tmz-apps/cms-js/plugins/ncr/nodeUrl.js';
import withBlockPreview from '@tmz-apps/cms-js/blocksmith/components/with-block-preview/index.js';
import {
  CONTENT_TYPES,
  SOURCE_TYPES,
  contentTypeFor,
  sourceTypeFor,
} from '@tmz-apps/cms-js/blocksmith/components/slider-block-modal/sourceTypes.js';

function SliderBlockPreview(props) {
  const { block } = props;
  const request = block.get('search_request');
  const contentType = request && contentTypeFor(request.schema().getId());
  const sourceType = request && sourceTypeFor(contentType, request.toObject());
  const sourceValue = sourceType && request.get(SOURCE_TYPES[sourceType].field);
  const source = Array.isArray(sourceValue) ? sourceValue[0] : sourceValue;
  // teaser types are slugs, everything else is a node ref
  const { node: sourceNode } = useNode(sourceType === 'type' ? undefined : source);

  return (
    <Table borderless size="sm" className="mb-0">
      <tbody>
      <tr>
        <th className="nowrap ps-2 pt-0" scope="row">Content Type:</th>
        <td className="w-100 pt-0">{contentType ? CONTENT_TYPES[contentType].label : <Badge color="danger">not set</Badge>}</td>
      </tr>
      <tr>
        <th className="nowrap ps-2" scope="row">{sourceType ? SOURCE_TYPES[sourceType].label : 'Source'}:</th>
        <td className="w-100 text-break">
          {!source && <Badge color="danger">not set</Badge>}
          {source && sourceNode && <a href={nodeUrl(sourceNode, 'view')} target="_blank">{sourceNode.get('title')}</a>}
          {source && !sourceNode && `${source}`}
        </td>
      </tr>
      {request?.has('q') && (
        <tr>
          <th className="nowrap ps-2" scope="row">Query:</th>
          <td className="w-100 text-break">{request.get('q')}</td>
        </tr>
      )}
      <tr>
        <th className="nowrap ps-2" scope="row">Count:</th>
        <td className="w-100">{request?.get('count')}</td>
      </tr>
      <tr>
        <th className="nowrap ps-2" scope="row">Header:</th>
        <td className="w-100 text-break">
          {block.get('show_header') ? block.get('header_text', 'Related Stories') : <Badge color="dark">hidden</Badge>}
        </td>
      </tr>
      </tbody>
    </Table>
  );
}

export default withBlockPreview(SliderBlockPreview);
