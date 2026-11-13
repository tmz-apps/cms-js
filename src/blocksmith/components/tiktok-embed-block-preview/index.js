import React, { useEffect, useState } from 'react';
import withBlockPreview from '@tmz-apps/cms-js/blocksmith/components/with-block-preview/index.js';

function TiktokEmbedBlockPreview(props) {
  const { block } = props;
  const id = block.get('tiktok_id');
  const username = block.get('user_name');
  const [embedError, setEmbedError] = useState(false);
  const url = `https://www.tiktok.com/${username}/video/${id}`;

  // ref: https://developers.tiktok.com/docs/en/embed-player
  useEffect(() => {
    const handleMessage = ({ data }) => {
      const type = data?.type;

      if (type && type?.toLowerCase().includes('error')) {
        setEmbedError(true);
        window.removeEventListener('message', handleMessage);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  if (embedError) {
    return (<p><a href={url} target="_blank" rel="noreferrer noopener">{url}</a></p>);
  }

  return (
    <p className="text-center">
      <a href={url} className="hover-box-shadow d-inline-block rounded-2" target="_blank" rel="noreferrer noopener">
        <iframe 
          src={`https://www.tiktok.com/player/v1/${id}?embed_from=oembed&music_info=1&description=1&autoplay=1&muted=1`}
          className="rounded-2"
          frameborder="0"
          allow="accelerometer;"
          loading="lazy"
          width="250"
          height="auto"
          allowfullscreen
          object
        />
      </a>
    </p>
  );
}

export default withBlockPreview(TiktokEmbedBlockPreview);
