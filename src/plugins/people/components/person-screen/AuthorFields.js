import React, { useState } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import { SwitchField, TextField } from '@tmz-apps/cms-js/components/index.js';

export default function AuthorFields () {
  return (
    <Card>
      <CardHeader>Authorship</CardHeader>
      <CardBody className="pb-0">
        <SwitchField name="is_author" label="Is Author" />
        <TextField name="job_title" label="Job Title" />
      </CardBody>
    </Card>
  );
}
