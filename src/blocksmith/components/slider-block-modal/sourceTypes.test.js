import test from 'tape';
import {
  CONTENT_TYPES,
  contentTypeFor,
  schemaIdFor,
  sourceTypeFor,
  sourceTypesFor,
} from './sourceTypes.js';

test('sourceTypesFor only offers timeline, gallery and type on teasers', (t) => {
  const teaserOnly = ['timeline', 'gallery', 'type'];
  Object.keys(CONTENT_TYPES).forEach((contentType) => {
    const offered = sourceTypesFor(contentType).filter(sourceType => teaserOnly.includes(sourceType));
    t.deepEqual(offered, contentType === 'teasers' ? teaserOnly : [], contentType);
  });
  t.deepEqual(sourceTypesFor('nope'), [], 'unknown content type');
  t.end();
});

test('schemaIdFor and contentTypeFor round trip', (t) => {
  Object.keys(CONTENT_TYPES).forEach((contentType) => {
    t.equal(contentTypeFor(schemaIdFor(contentType)), contentType, contentType);
  });
  t.equal(schemaIdFor('articles'), 'pbj:acme:news:request:search-articles-request:1-0-0', 'uses app vendor');
  t.equal(contentTypeFor('pbj:acme:news:request:nope:1-0-0'), undefined, 'unknown schema id');
  t.end();
});

test('sourceTypeFor picks the populated filter', (t) => {
  const cases = [
    ['articles', { category_refs: ['acme:category:1'] }, 'category', 'single category'],
    ['articles', { category_refs: [] }, undefined, 'empty set is not a source'],
    ['articles', { channel_ref: 'acme:channel:1' }, 'channel', 'channel ref'],
    ['articles', { timeline_ref: 'acme:timeline:1' }, undefined, 'timeline ignored outside teasers'],
    ['teasers', { timeline_ref: 'acme:timeline:1' }, 'timeline', 'timeline on teasers'],
    ['teasers', { types: ['article-teaser'] }, 'type', 'types on teasers'],
    ['articles', undefined, undefined, 'no request'],
  ];

  cases.forEach(([contentType, searchRequest, expected, description]) => {
    t.equal(sourceTypeFor(contentType, searchRequest), expected, description);
  });
  t.end();
});
