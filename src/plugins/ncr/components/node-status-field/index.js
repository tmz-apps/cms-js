import React from 'react';
import startCase from 'lodash-es/startCase.js';
import NodeStatus from '@gdbots/schemas/gdbots/ncr/enums/NodeStatus.js';
import { EnumField } from '@tmz-apps/cms-js/components/index.js';
import Option from '@tmz-apps/cms-js/plugins/ncr/components/node-status-field/Option.js';
import SingleValue from '@tmz-apps/cms-js/plugins/ncr/components/node-status-field/SingleValue.js';

const expirableOptions = {
  published: true,
  expired: true,
  archived: true,
  deleted: true,
};

const minimalOptions = {
  published: true,
  deleted: true,
};

const filters = {
  all: option => option.value !== 'unknown',
  expirable: option => !!expirableOptions[option.value],
  minimal: option => !!minimalOptions[option.value],
};

const format = label => startCase(label.toLowerCase());

const components = { Option, SingleValue };

export default function NodeStatusField(props) {
  const { preset = 'all' } = props;

  return <EnumField
    enumClass={NodeStatus}
    cacheKey={preset}
    filter={filters[preset] || filters.all}
    format={format}
    name="status"
    placeholder="Select Status:"
    components={components}
    {...props}
  />;
}
