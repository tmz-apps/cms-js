import React from 'react';
import { TextField } from '@tmz-apps/cms-js/components/index.js';
import parseYouTubeId from '@tmz-apps/cms-js/utils/parseYouTubeId.js';

export default function YoutubeVideoTeaserFields() {
  return (
    <>
      <TextField name="youtube_video_id" label="YouTube Video ID" parse={parseYouTubeId} required placeholder="Paste in a YouTube URL or Video ID" />
      <TextField name="youtube_custom_id" label="YouTube Custom ID" />
    </>
  );
}
