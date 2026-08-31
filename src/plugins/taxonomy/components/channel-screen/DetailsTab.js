import React from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import { TextareaField, TextField } from '@tmz-apps/cms-js/components/index.js';
import SponsorPickerField from '@tmz-apps/cms-js/plugins/boost/components/sponsor-picker-field/index.js';
import AdvertisingFields from '@tmz-apps/cms-js/plugins/common/components/advertising-fields/index.js';
import TaggableFields from '@tmz-apps/cms-js/plugins/common/components/taggable-fields/index.js';
import ImageAssetPickerField from '@tmz-apps/cms-js/plugins/dam/components/image-asset-picker-field/index.js';
import SlugField from '@tmz-apps/cms-js/plugins/ncr/components/slug-field/index.js';
import PicklistField from '@tmz-apps/cms-js/plugins/sys/components/picklist-field/index.js';
import HashtagPickerField from '@tmz-apps/cms-js/plugins/taxonomy/components/hashtag-picker-field/index.js';

export default function DetailsTab(props) {
  const { node } = props;
  const schema = node.schema();

  return (
    <>
      <Card>
        <CardHeader>Details</CardHeader>
        <CardBody>
          <TextField name="title" label="Title" required />
          <SlugField />
          <TextareaField name="description" label="Description" />
          <ImageAssetPickerField name="image_ref" label="Primary Image" />
          {schema.hasMixin('triniti:common:mixin:themeable') && (
            <PicklistField picklist="channel-themes" name="theme" label="Theme" />
          )}
          {schema.hasMixin('triniti:taxonomy:mixin:hashtaggable') && (
            <HashtagPickerField name="hashtags" label="Hashtags" />
          )}
          {schema.hasMixin('triniti:boost:mixin:sponsorable') && (
            <SponsorPickerField name="sponsor_ref" label="Sponsor" />
          )}
        </CardBody>
      </Card>
      <AdvertisingFields />
      <TaggableFields />
    </>
  );
}
