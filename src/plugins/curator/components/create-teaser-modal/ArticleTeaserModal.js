import React from 'react';
import ArticlePickerField from '@tmz-apps/cms-js/plugins/news/components/article-picker-field/index.js';
import withTeaserModal from '@tmz-apps/cms-js/plugins/curator/components/create-teaser-modal/withTeaserModal.js';

function ArticleTeaserModal() {
  return (
    <>
      <ArticlePickerField name="target_ref" label="Target Article" required />
    </>
  );
}

export default withTeaserModal(ArticleTeaserModal);
