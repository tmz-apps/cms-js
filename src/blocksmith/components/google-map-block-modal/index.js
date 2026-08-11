import React from 'react';
import { NumberField, SelectField, TextField } from '@tmz-apps/cms-js/components/index.js';
import withBlockModal from '@tmz-apps/cms-js/blocksmith/components/with-block-modal/index.js';

const mapTypes = [
  { label: 'roadmap', value: 'roadmap' },
  { label: 'satellite', value: 'satellite' },
];

// todo: add geopoint field for "center"? are we using this right now?
function GoogleMapBlockModal() {
  return (
    <>
      <TextField name="q" label="Query / Location" />
      <NumberField
        name="zoom"
        label="Zoom Level"
        description="0, the most zoomed out, showing the world, to 21, the most zoomed in."
      />
      <SelectField name="maptype" label="Map Type" options={mapTypes} />
    </>
  );
}

export default withBlockModal(GoogleMapBlockModal);
