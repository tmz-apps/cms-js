import React from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import { TextField } from '@tmz-apps/cms-js/components/index.js';

export default function SocialFields (props) {
  const { node } = props;
  const schema = node.schema();

  return (
    <Card>
      <CardHeader>Social Presence</CardHeader>
      <CardBody className="pb-0">
        <TextField name="twitter_username" label="Twitter Username" />
        {schema.hasField('facebook_username') && (
          <TextField name="facebook_username" label="Facebook Username" />
        )}
        {schema.hasField('tiktok_username') && (
          <TextField name="tiktok_username" label="TikTok Username" />
        )}
      </CardBody>
    </Card>
  );
}
