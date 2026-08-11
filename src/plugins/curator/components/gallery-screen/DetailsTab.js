import React from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import {
  DatePickerField,
  SelectField,
  SwitchField,
  TextareaField,
  TextField,
  UrlField
} from '@tmz-apps/cms-js/components/index.js';
import AdvertisingFields from '@tmz-apps/cms-js/plugins/common/components/advertising-fields/index.js';
import SeoTitleField from '@tmz-apps/cms-js/plugins/common/components/seo-title-field/index.js';
import ImageAssetPickerField from '@tmz-apps/cms-js/plugins/dam/components/image-asset-picker-field/index.js';
import PicklistField from '@tmz-apps/cms-js/plugins/sys/components/picklist-field/index.js';
import SlugField from '@tmz-apps/cms-js/plugins/ncr/components/slug-field/index.js';
import GalleryPickerField from '@tmz-apps/cms-js/plugins/curator/components/gallery-picker-field/index.js';
import SponsorPickerField from '@tmz-apps/cms-js/plugins/boost/components/sponsor-picker-field/index.js';
import TaggableFields from '@tmz-apps/cms-js/plugins/common/components/taggable-fields/index.js';
import galleryLayouts from '@triniti/app/config/galleryLayouts.js';

export default function DetailsTab(props) {
  const { node } = props;
  const schema = node.schema();

  return (
    <>
      <Card>
        <CardHeader>Details</CardHeader>
        <CardBody>
          <SeoTitleField />
          <SlugField withDatedSlug />

          {schema.hasMixin('triniti:curator:mixin:teaserable') && (
            <DatePickerField name="order_date" label="Order Date" />
          )}

          {schema.hasMixin('gdbots:ncr:mixin:expirable') && (
            <DatePickerField 
              name="expires_at" 
              label="Expires At" 
              showQuickSelect
              quickSelectOptions={[
                { amount: 5, unit: 'year' },
                { amount: 1, unit: 'year' }
              ]}
            />
          )}

          <TextareaField name="description" label="Description" rows={5} />
          <ImageAssetPickerField name="image_ref" label="Primary Image" />
          <TextField name="launch_text" label="Launch Text" />
          <PicklistField picklist="gallery-credits" name="credit" label="Credit" />
          <UrlField name="credit_url" label="Credit URL" />
          <SelectField name="layout" label="Layout" options={galleryLayouts} />

          {schema.hasMixin('triniti:boost:mixin:sponsorable') && (
            <SponsorPickerField name="sponsor_ref" label="Sponsor" />
          )}

          {schema.hasMixin('triniti:common:mixin:themeable') && (
            <PicklistField picklist="gallery-themes" name="theme" label="Theme" />
          )}

          <SwitchField name="allow_comments" label="Allow Comments" />
        </CardBody>
      </Card>

      <Card>
        <CardHeader>Related Galleries</CardHeader>
        <CardBody>
          <GalleryPickerField name="prev_gallery_ref" label="Previous Gallery" />
          <GalleryPickerField name="next_gallery_ref" label="Next Gallery" />
          <GalleryPickerField name="related_gallery_refs" label="Related Galleries" isMulti sortable />
        </CardBody>
      </Card>

      <AdvertisingFields />
      <TaggableFields />
    </>
  );
}
