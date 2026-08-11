import { useSelector } from 'react-redux';
import getPolicy from '@tmz-apps/cms-js/plugins/iam/selectors/getPolicy.js';

export default () => useSelector(getPolicy);
