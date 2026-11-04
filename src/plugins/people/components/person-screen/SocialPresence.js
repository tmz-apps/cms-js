import React, { useState } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import { TextField } from '@tmz-apps/cms-js/components/index.js';

export default function SocialPresence () {
  return (
    <Card>
      <CardHeader>Social Presence</CardHeader>
      <CardBody className="pb-0">
        <TextField name="twitter_username" label="Twitter Username" />
        <TextField name="facebook_username" label="Facebook Username" />
        <TextField name="tiktok_username" label="TikTok Username" />
      </CardBody>
    </Card>
  );
}
        