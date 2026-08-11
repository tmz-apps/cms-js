import React from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import { SwitchField, TextareaField, TextField } from '@tmz-apps/cms-js/components/index.js';
import ImageAssetPickerField from '@tmz-apps/cms-js/plugins/dam/components/image-asset-picker-field/index.js';
import PicklistField from '@tmz-apps/cms-js/plugins/sys/components/picklist-field/index.js';

export default function ShowtimesWidgetFields() {
  return (
    <Card>
      <CardHeader>Showtimes Widget Configuration</CardHeader>
      <CardBody>
        <TextField name="headline" label="Headline" />
        <TextareaField name="excerpt" label="Excerpt" rows={3} />
        <ImageAssetPickerField name="image_ref" label="Image" />
        <PicklistField picklist="showtimes-widget-shows" name="show" label="Show" />
        <SwitchField name="include_latest_episode" label="Include Latest Episode" />
        <SwitchField name="include_latest_promo" label="Include Latest Promo" />
      </CardBody>
    </Card>
  );
}
