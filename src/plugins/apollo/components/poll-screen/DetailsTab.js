import React from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import { DatePickerField, SwitchField, TextField, UrlField } from '@tmz-apps/cms-js/components/index.js';
import SeoTitleField from '@tmz-apps/cms-js/plugins/common/components/seo-title-field/index.js';
import ImageAssetPickerField from '@tmz-apps/cms-js/plugins/dam/components/image-asset-picker-field/index.js';
import SponsorPickerField from '@tmz-apps/cms-js/plugins/boost/components/sponsor-picker-field/index.js';
import TaggableFields from '@tmz-apps/cms-js/plugins/common/components/taggable-fields/index.js';
import SortableAnswers from '@tmz-apps/cms-js/plugins/apollo/components/poll-screen/SortableAnswers.js';

export default function DetailsTab(props) {
  const { node } = props;
  const schema = node.schema();

  return (
    <>
      <Card>
        <CardHeader>Details</CardHeader>
        <CardBody>
          <SeoTitleField />
          <TextField name="question" label="Question" required />
          <UrlField name="question_url" label="Question URL" />
          <SwitchField name="allow_multiple_responses" label="Allow Multiple Responses" />

          {schema.hasMixin('triniti:curator:mixin:teaserable') && (
            <DatePickerField name="order_date" label="Order Date" />
          )}

          {schema.hasMixin('gdbots:ncr:mixin:expirable') && (
            <DatePickerField name="expires_at" label="Expires At" />
          )}

          <ImageAssetPickerField name="image_ref" label="Primary Image" />

          {schema.hasMixin('triniti:boost:mixin:sponsorable') && (
            <SponsorPickerField name="sponsor_ref" label="Sponsor" />
          )}
        </CardBody>
      </Card>

      <Card>
        <CardHeader>Answers</CardHeader>
        <CardBody>
          <SortableAnswers />
        </CardBody>
      </Card>

      <TaggableFields />
    </>
  );
}
