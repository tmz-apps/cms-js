import React, { useState } from 'react';
import { FormText } from 'reactstrap';
import { TextField, useFormContext } from '@tmz-apps/cms-js/components/index.js';
import withBlockModal from '@tmz-apps/cms-js/blocksmith/components/with-block-modal/index.js';
import parseIframeSrc from '../../utils/parseIframeSrc.js';

const EMBED_PATTERN = /.*tiktok\.com\/@?([\w\.]+)\/video\/(\d+).*/;
const IFRAME_SRC_EMBED_PATTERN = /.*tiktok\.com\/player\/v1\/(\d+).*/;

function TiktokEmbedBlockModal() {
  const { editMode, form } = useFormContext();
  const [embed, setEmbed] = useState(null);
  const [embedError, setEmbedError] = useState(null);

  const handleChangeEmbed = (event) => {
    event.preventDefault();
    event.stopPropagation();
    let value = event.target.value || '';
    value = parseIframeSrc(value) || value;
    setEmbed(value);

    const matches = value.match(EMBED_PATTERN) || value.match(IFRAME_SRC_EMBED_PATTERN);
    if (!matches) {
      setEmbedError('This value doesn\'t look like a TikTok Embed code.');
      return;
    }
    setEmbedError(null);
  
    let userName;
    let id;
    if (EMBED_PATTERN.test(value)) {
      userName = matches[1];
      id = matches[2];
    } else {
      id = matches[1];
    }

    form.batch(() => {
      form.change('user_name', userName);
      form.change('tiktok_id', id);
    });
  };

  return (
    <>
      {editMode && (
        <div className="form-group">
          <textarea
            className="form-control"
            rows={4}
            placeholder="Paste in a TikTok Embed Code"
            onChange={handleChangeEmbed}
          />
          {embed && embedError && <FormText color="danger">{embedError}</FormText>}
        </div>
      )}
      <TextField name="user_name" label="TikTok Username" />
      <TextField name="tiktok_id" label="TikTok ID" required />
    </>
  );
}

export default withBlockModal(TiktokEmbedBlockModal);
