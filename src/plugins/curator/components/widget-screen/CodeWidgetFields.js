import React from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import { TextareaField } from '@tmz-apps/cms-js/components/index.js';

export default function CodeWidgetFields() {
  return (
    <Card>
      <CardHeader>Code Widget Configuration</CardHeader>
      <CardBody>
        <TextareaField name="code" label="Code" rows={10} />
      </CardBody>
    </Card>
  );
}
