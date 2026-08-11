import React from 'react';
import ArticlePickerField from '@tmz-apps/cms-js/plugins/news/components/article-picker-field/index.js';

export default function ArticleTeaserFields() {
  return (
    <ArticlePickerField name="target_ref" label="Target Article" required readOnly />
  );
}
