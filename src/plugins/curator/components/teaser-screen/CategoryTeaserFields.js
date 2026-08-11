import React from 'react';
import CategoryPickerField from '@tmz-apps/cms-js/plugins/taxonomy/components/category-picker-field/index.js';

export default function CategoryTeaserFields() {
  return (
    <CategoryPickerField name="target_ref" label="Target Category" required readOnly />
  );
}
