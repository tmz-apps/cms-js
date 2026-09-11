import React, { useEffect, useMemo, useRef } from 'react';
import { Badge } from 'reactstrap';
import { NumberField, SelectField, SwitchField, TextField, withPbj } from '@tmz-apps/cms-js/components/index.js';
import useCuries from '@tmz-apps/cms-js/plugins/pbjx/components/useCuries.js';
import CategoryPickerField from '@tmz-apps/cms-js/plugins/taxonomy/components/category-picker-field/index.js';
import ChannelPickerField from '@tmz-apps/cms-js/plugins/taxonomy/components/channel-picker-field/index.js';
import PersonPickerField from '@tmz-apps/cms-js/plugins/people/components/person-picker-field/index.js';
import GalleryPickerField from '@tmz-apps/cms-js/plugins/curator/components/gallery-picker-field/index.js';
import TimelinePickerField from '@tmz-apps/cms-js/plugins/curator/components/timeline-picker-field/index.js';
import withBlockModal from '@tmz-apps/cms-js/blocksmith/components/with-block-modal/index.js';
import Footer from '@tmz-apps/cms-js/blocksmith/components/slider-block-modal/Footer.js';
import {
  CONTENT_TYPES,
  DEFAULT_COUNT,
  DEFAULT_SORT,
  SOURCE_TYPES,
  V1_CONTENT_TYPES,
  V1_SOURCE_TYPES,
  contentTypeFor,
  schemaIdFor,
  sourceTypeFor,
  sourceTypesFor,
} from '@tmz-apps/cms-js/blocksmith/components/slider-block-modal/sourceTypes.js';

const DEFAULT_HEADER_TEXT = 'Related Stories';

const contentTypeOptions = V1_CONTENT_TYPES.map(contentType => ({
  label: CONTENT_TYPES[contentType].label,
  value: schemaIdFor(contentType),
}));

const newSliderBlock = {
  search_request: {
    _schema: schemaIdFor(V1_CONTENT_TYPES[0]),
    count: DEFAULT_COUNT,
    sort: DEFAULT_SORT,
  },
};

const v1SourceTypeFor = contentType => sourceTypesFor(contentType).find(type => V1_SOURCE_TYPES.includes(type));

function TeaserTypesField(props) {
  const curies = useCuries('triniti:curator:mixin:teaser:v1');
  if (!curies) {
    return null;
  }

  const options = curies.map((curie) => {
    const type = curie.split(':').pop();
    return { label: type.replace('-teaser', ''), value: type };
  });

  return <SelectField {...props} options={options} />;
}

const sourcePickers = {
  category: CategoryPickerField,
  channel: ChannelPickerField,
  person: PersonPickerField,
  timeline: TimelinePickerField,
  gallery: GalleryPickerField,
  type: TeaserTypesField,
};

// v1 picks one source even when the request field is a set.
const firstOf = refs => refs?.[0] ?? '';
const asSet = ref => (ref ? [ref] : undefined);

const optional = <Badge className="ms-1" color="light" pill>optional</Badge>;

function SectionHeading({ title, badge }) {
  return (
    <>
      <label className="form-label-strong">
        {title}
        {badge && <Badge className="ms-1" color="light" pill>{badge}</Badge>}
      </label>
      <hr className="mt-1 mb-3" />
    </>
  );
}

function StepTwoFields(props) {
  const { pbj: request, sourceType } = props;
  const { label, field, placeholder } = SOURCE_TYPES[sourceType];
  const SourcePicker = sourcePickers[sourceType];
  const isSet = request.schema().getField(field).isASet();

  return (
    <>
      <SectionHeading title="Source" badge="pick one" />
      <SourcePicker
        nestedPbj={request}
        pbjName={field}
        name={`search_request.${field}`}
        label={label}
        placeholder={placeholder}
        format={isSet ? firstOf : undefined}
        parse={isSet ? asSet : undefined}
        required
      />

      <SectionHeading title="Display" />
      <TextField
        name="header_text"
        label={<>Header Text{optional}</>}
        placeholder={DEFAULT_HEADER_TEXT}
      />
      <SwitchField name="show_header" label="Show Header" />

      <SectionHeading title="Search Request" />
      <TextField
        nestedPbj={request}
        pbjName="q"
        name="search_request.q"
        label={<>Query{optional}</>}
        placeholder="Filter by keyword"
      />
      <NumberField
        nestedPbj={request}
        pbjName="count"
        name="search_request.count"
        label="Count"
        min={1}
      />
    </>
  );
}

function SliderBlockModal(props) {
  const { form, formState, step } = props;
  const { values } = formState;
  const contentType = contentTypeFor(values.search_request?._schema);
  const sourceType = sourceTypeFor(contentType, values.search_request) || v1SourceTypeFor(contentType);

  // changing content type swaps the request schema, so the old filters go with it.
  const previousContentType = useRef(contentType);
  useEffect(() => {
    if (!contentType || previousContentType.current === contentType) {
      return;
    }

    previousContentType.current = contentType;
    form.change('search_request', {
      _schema: schemaIdFor(contentType),
      count: values.search_request.count,
      sort: DEFAULT_SORT,
    });
  }, [contentType]);

  const StepTwoFieldsWithRequest = useMemo(
    () => contentType && withPbj(StepTwoFields, CONTENT_TYPES[contentType].curie),
    [contentType],
  );

  if (step === 1) {
    return (
      <SelectField
        name="search_request._schema"
        label="Content Type"
        options={contentTypeOptions}
        isClearable={false}
        required
      />
    );
  }

  return sourceType && StepTwoFieldsWithRequest && <StepTwoFieldsWithRequest sourceType={sourceType} />;
}

const SliderBlockModalWithBlock = withBlockModal(SliderBlockModal, { Footer });

export default function SliderBlockModalWithDefaults(props) {
  return <SliderBlockModalWithBlock {...props} pbj={props.pbj || newSliderBlock} />;
}
