import Policy from '@tmz-apps/cms-js/plugins/iam/Policy.js';

const emptyPolicy = new Policy;

export default ({ iam }) => iam.policy || emptyPolicy;
