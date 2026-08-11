import React from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import { SelectField, SwitchField, TextareaField, TextField, UrlField } from '@tmz-apps/cms-js/components/index.js';
import Blocksmith from '@tmz-apps/cms-js/blocksmith/index.js';
import AdvertisingFields from '@tmz-apps/cms-js/plugins/common/components/advertising-fields/index.js';
import TaggableFields from '@tmz-apps/cms-js/plugins/common/components/taggable-fields/index.js';
import ImageAssetPickerField from '@tmz-apps/cms-js/plugins/dam/components/image-asset-picker-field/index.js';
import SlugField from '@tmz-apps/cms-js/plugins/ncr/components/slug-field/index.js';
import PicklistField from '@tmz-apps/cms-js/plugins/sys/components/picklist-field/index.js';
import HashtagPickerField from '@tmz-apps/cms-js/plugins/taxonomy/components/hashtag-picker-field/index.js';

const bioSourceOptions = [
  { value: 'imdb', label: 'imdb' },
  { value: 'freebase', label: 'freebase' },
  { value: 'custom', label: 'custom' },
];

export default function DetailsTab(props) {
  const { node, tab } = props;
  const schema = node.schema();

  return (
    <>
      <Card>
        <CardHeader>Details</CardHeader>
        <CardBody>
          <TextField name="title" label="Title" required />
          <SlugField />
          <ImageAssetPickerField name="image_ref" label="Primary Image" />
          <SelectField name="bio_source" label="Bio Source" options={bioSourceOptions} />
          <TextareaField name="bio" label="Bio" rows={10} />
          <SwitchField name="is_celebrity" label="Is Celebrity" />
          <UrlField name="imdb_url" label="Imdb Url" />
          <TextField name="twitter_username" label="Twitter Username" />
          {schema.hasMixin('triniti:common:mixin:themeable') && (
            <PicklistField picklist="person-themes" name="theme" label="Theme" />
          )}
          {schema.hasMixin('triniti:taxonomy:mixin:hashtaggable') && (
            <HashtagPickerField name="hashtags" label="Hashtags" />
          )}
        </CardBody>
      </Card>

      {schema.hasMixin('triniti:canvas:mixin:has-blocks') && (
        <Blocksmith isVisible={tab === 'details'} />
      )}

      <AdvertisingFields />
      <TaggableFields />
    </>
  );
}
