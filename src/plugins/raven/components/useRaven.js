import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getInstance } from '@triniti/app/main.js';
import { useFormContext } from '@tmz-apps/cms-js/components/index.js';
import NodeRef from '@gdbots/pbj/well-known/NodeRef.js';
import toast from '@tmz-apps/cms-js/utils/toast.js';
import getNode from '@tmz-apps/cms-js/plugins/ncr/selectors/getNode.js';
import isCollaboratingSelector from '@tmz-apps/cms-js/plugins/raven/selectors/isCollaborating.js';
import heartbeat from '@tmz-apps/cms-js/plugins/raven/actions/heartbeat.js';
import joinCollaboration from '@tmz-apps/cms-js/plugins/raven/actions/joinCollaboration.js';
import leaveCollaboration from '@tmz-apps/cms-js/plugins/raven/actions/leaveCollaboration.js';
import subscribe from '@tmz-apps/cms-js/plugins/raven/actions/subscribe.js';
import unsubscribe from '@tmz-apps/cms-js/plugins/raven/actions/unsubscribe.js';
import shouldShowStaleDataWarning from '@tmz-apps/cms-js/plugins/raven/utils/shouldShowStaleDataWarning.js';
import showStaleDataWarning from '@tmz-apps/cms-js/plugins/raven/utils/showStaleDataWarning.js';

export default (nodeRef, editMode, canCollaborate) => {
  const formContext = useFormContext();
  const dispatch = useDispatch();
  const isMounted = useRef(false);
  const editModeRef = useRef(editMode);
  const isCollaborating = useSelector((state) => isCollaboratingSelector(state, nodeRef));
  editModeRef.current = editMode;

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    dispatch(subscribe(nodeRef));
    const app = getInstance();

    const listener = async (event) => {
      if (!isMounted.current) {
        return;
      }

      if (!editModeRef.current) {
        toast({ title: 'Updated to latest version.' });
        formContext.delegate.shouldReinitialize = true;
        formContext.delegate.refreshNode();
        return;
      }

      if (event.isMine()) {
        // we ignore our own events
        return;
      }

      const pbj = event.getMessage();
      const node = app.select(getNode, nodeRef);
      if (!shouldShowStaleDataWarning(pbj.generateMessageRef(), null, node)) {
        return;
      }

      const ref = NodeRef.fromString(`${nodeRef}`);
      const userRef = pbj.has('ctx_user_ref') ? NodeRef.fromMessageRef(pbj.get('ctx_user_ref')) : '';
      let username = 'SYSTEM';
      if (userRef) {
        const user = app.select(getNode, userRef);
        if (user) {
          username = user.get('title');
        }
      }

      await showStaleDataWarning(ref, username);
    };

    app.getDispatcher().addListener(`raven.${nodeRef}`, listener);

    return () => {
      app.getDispatcher().removeListener(`raven.${nodeRef}`, listener);
      dispatch(leaveCollaboration(nodeRef));
      dispatch(unsubscribe(nodeRef));
    };
  }, [nodeRef]);

  useEffect(() => {
    let heartbeatInterval = null;
    const startCollaboration = () => {
      if (heartbeatInterval) {
        clearInterval(heartbeatInterval);
      }

      dispatch(joinCollaboration(nodeRef));
      heartbeatInterval = setInterval(() => {
        dispatch(heartbeat(nodeRef));
      }, 3000); // Temporary interval while CMS old and new coexist
    };

    const handleVisibilityChange = () => {
      if (!document.hidden) {
        // Page becomes visible: send immediate heartbeat and restart collaboration
        dispatch(heartbeat(nodeRef));
        startCollaboration();
      }
      // Page becomes hidden: keep heartbeats running to maintain "online" status
      // This ensures user stays visible to other collaborators even when tab is hidden
    };

    if (editMode && canCollaborate) {
      startCollaboration();
      document.addEventListener('visibilitychange', handleVisibilityChange);
    }

    return () => {
      if (heartbeatInterval) {
        clearInterval(heartbeatInterval);
      }
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [nodeRef, editMode, canCollaborate]);

  useEffect(() => {
    if (editMode) {
      return;
    }

    // in some cases a heartbeat has gone out (async) but the
    // user has switched to view mode which can leave the user
    // stuck collaborating until pruneCollaborators runs again
    // minor nit but worth addressing.
    if (isCollaborating) {
      dispatch(leaveCollaboration(nodeRef));
    }
  }, [nodeRef, editMode, isCollaborating]);
};
