// The slider block stores a full search request. The request curie is the
// content type and the populated filter field is the source. v1 of the editor
// only exposes articles by category; the rest of the model is here so later
// releases widen the V1_* lists instead of rebuilding the modal.

export const SOURCE_TYPES = {
  category: { label: 'Category', field: 'category_refs', placeholder: 'Select a category' },
  channel: { label: 'Channel', field: 'channel_ref', placeholder: 'Select a channel' },
  person: { label: 'Person', field: 'person_refs', placeholder: 'Select a person' },
  timeline: { label: 'Timeline', field: 'timeline_ref', placeholder: 'Select a timeline' },
  gallery: { label: 'Gallery', field: 'gallery_ref', placeholder: 'Select a gallery' },
  type: { label: 'Type', field: 'types', placeholder: 'Select a teaser type' },
};

// timeline, gallery and type filters only exist on the teasers request.
export const CONTENT_TYPES = {
  articles: {
    label: 'Articles',
    curie: `${APP_VENDOR}:news:request:search-articles-request`,
    sourceTypes: ['category', 'channel', 'person'],
  },
  videos: {
    label: 'Videos',
    curie: `${APP_VENDOR}:ovp:request:search-videos-request`,
    sourceTypes: ['category', 'channel', 'person'],
  },
  galleries: {
    label: 'Galleries',
    curie: `${APP_VENDOR}:curator:request:search-galleries-request`,
    sourceTypes: ['category', 'channel', 'person'],
  },
  teasers: {
    label: 'Teasers',
    curie: `${APP_VENDOR}:curator:request:search-teasers-request`,
    sourceTypes: ['timeline', 'gallery', 'type', 'channel', 'person', 'category'],
  },
};

export const V1_CONTENT_TYPES = ['articles'];
export const V1_SOURCE_TYPES = ['category'];
export const DEFAULT_COUNT = 6;
export const DEFAULT_SORT = 'published-at-desc';

export const schemaIdFor = (contentType) => `pbj:${CONTENT_TYPES[contentType].curie}:1-0-0`;

export const contentTypeFor = (schemaId) => Object.keys(CONTENT_TYPES)
  .find(contentType => schemaIdFor(contentType) === `${schemaId}`);

export const sourceTypesFor = (contentType) => CONTENT_TYPES[contentType]?.sourceTypes || [];

export const sourceTypeFor = (contentType, searchRequest) => sourceTypesFor(contentType)
  .find(sourceType => {
    const value = searchRequest?.[SOURCE_TYPES[sourceType].field];
    return Array.isArray(value) ? value.length > 0 : !!value;
  });
