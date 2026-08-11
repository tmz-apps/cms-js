import startCase from 'lodash-es/startCase.js';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import NodeRef from '@gdbots/pbj/well-known/NodeRef.js';
import clearAlerts from '@tmz-apps/cms-js/actions/clearAlerts.js';
import sendAlert from '@tmz-apps/cms-js/actions/sendAlert.js';
import getFriendlyErrorMessage from '@tmz-apps/cms-js/plugins/pbjx/utils/getFriendlyErrorMessage.js';
import progressIndicator from '@tmz-apps/cms-js/utils/progressIndicator.js';
import toast from '@tmz-apps/cms-js/utils/toast.js';
import nodeUrl from '@tmz-apps/cms-js/plugins/ncr/nodeUrl.js';
import duplicateNode from '@tmz-apps/cms-js/plugins/ncr/actions/duplicateNode.js';

export default () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return async (node) => {
    const ref = NodeRef.fromNode(node);
    const result = await Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: `Duplicate ${startCase(ref.getLabel())}`,
      reverseButtons: true,
      allowOutsideClick: false,
      allowEscapeKey: false,
    });

    if (!result.value) {
      return;
    }

    try {
      await progressIndicator.show(`Duplicating ${startCase(ref.getLabel())}...`);
      const newNode = await dispatch(duplicateNode(node));
      await progressIndicator.close();
      toast({ title: `${startCase(ref.getLabel())} duplicated.` });
      dispatch(clearAlerts());
      await navigate(nodeUrl(newNode, 'edit'));
    } catch (e) {
      await progressIndicator.close();
      dispatch(sendAlert({ type: 'danger', message: getFriendlyErrorMessage(e) }));
    }
  }
};
