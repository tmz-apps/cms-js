import React from 'react';
import { Alert } from 'reactstrap';
import { TextField } from '@tmz-apps/cms-js/components/index.js';
import withBlockModal from '@tmz-apps/cms-js/blocksmith/components/with-block-modal/index.js';

function SpotifyTrackBlockModal() {
  return (
    <>
      <Alert color="warning">This block is deprecated, use the Spotify Embed block instead.</Alert>
      <TextField name="track_id" label="Spotify Track ID" required />
    </>
  );
}

export default withBlockModal(SpotifyTrackBlockModal);
