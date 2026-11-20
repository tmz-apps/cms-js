import React, { useEffect, useRef, useState } from 'react';
import withBlockPreview from '@tmz-apps/cms-js/blocksmith/components/with-block-preview/index.js';

function TiktokEmbedBlockPreview(props) {
  const { block } = props;
  const id = block.get('tiktok_id');
  const [embedError, setEmbedError] = useState(false);
  const iframeRef = useRef(null);
  const url = `https://www.tiktok.com/player/v1/${id}`;

  // ref: https://developers.tiktok.com/docs/en/embed-player
  useEffect(() => {
    const handleMessage = ({ origin, data, source }) => {
      if (origin !== 'https://www.tiktok.com') {
        return;
      }

      if (!data?.['x-tiktok-player'] || !['onPlayerError', 'onError'].includes(data?.type) || source !== iframeRef?.current?.contentWindow) {
        return;
      }

      setEmbedError(true);
      window.removeEventListener('message', handleMessage);
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  if (embedError) {
    return (<p><a href={url} target="_blank" rel="noreferrer noopener">{url}</a></p>);
  }

  return (
    <div className="text-center">
      <iframe title="TikTok video player"
        src={`${url}?music_info=1&description=1`}
        ref={iframeRef}
        style={{
          aspectRatio: '195 / 347',
          frameBorder: 0
        }}
        className="d-inline-block rounded-2"
        allow="accelerometer;"
        loading="lazy"
        height="347"
        width="195"
        allowFullScreen
      />
    </div>
  );
}

export default withBlockPreview(TiktokEmbedBlockPreview);
