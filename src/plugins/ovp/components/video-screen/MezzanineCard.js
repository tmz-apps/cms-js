import React from 'react';
import { Card, CardBody, CardHeader, Table } from 'reactstrap';
import { UrlField } from '@tmz-apps/cms-js/components/index.js';
import useNode from '@tmz-apps/cms-js/plugins/ncr/components/useNode.js';
import TranscodeableCard from '@tmz-apps/cms-js/plugins/dam/components/asset-screen/TranscodeableCard.js';
import VideoAssetPickerField from '@tmz-apps/cms-js/plugins/dam/components/video-asset-picker-field/index.js';

export default function MezzanineCard(props) {
  const { node } = props;
  const { node: asset } = useNode(node.get('mezzanine_ref'));

  return (
    <>
      <Card>
        <CardHeader>Mezzanine</CardHeader>
        <CardBody>
          <VideoAssetPickerField name="mezzanine_ref" label="Mezzanine Asset"/>
          <UrlField name="mezzanine_url" label="Mezzanine URL"/>
          <Table className="border-bottom mb-0 mt-3" size="sm">
            <tbody>
              <tr>
                <th className="nowrap ps-2" scope="row">Vertical:</th>
                <td className="w-100">{node.get('is_vertical') ? 'Yes' : 'No'}</td>
              </tr>
            </tbody>
          </Table>
        </CardBody>
      </Card>

      {asset && <TranscodeableCard node={asset} />}
    </>
  );
}
