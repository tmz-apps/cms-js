import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useFormState } from 'react-final-form';
import { FORM_ERROR } from 'final-form';
import { Form, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import startCase from 'lodash-es/startCase.js';
import { getInstance } from '@triniti/app/main.js';
import { ActionButton, FormErrors, TextareaField, TextField, withForm } from '@tmz-apps/cms-js/components/index.js';
import progressIndicator from '@tmz-apps/cms-js/utils/progressIndicator.js';
import toast from '@tmz-apps/cms-js/utils/toast.js';
import getFriendlyErrorMessage from '@tmz-apps/cms-js/plugins/pbjx/utils/getFriendlyErrorMessage.js';
import nodeUrl from '@tmz-apps/cms-js/plugins/ncr/nodeUrl.js';
import createNode from '@tmz-apps/cms-js/plugins/ncr/actions/createNode.js';
import getNode from '@tmz-apps/cms-js/plugins/ncr/selectors/getNode.js';
import ContentRefField from '@tmz-apps/cms-js/plugins/notify/components/content-ref-field/index.js';
import SendOptionsField from '@tmz-apps/cms-js/plugins/notify/components/send-options-field/index.js';

const getContent = ref => getNode(getInstance().getRedux().getState(), ref);

export default function withNotificationModal(ModalFields) {
  return withForm(function NotificationModal(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { appRef, contentRef, delegate, form, formState, handleSubmit, pbj } = props;
    const { dirty, hasSubmitErrors, submitErrors, submitting, valid } = formState;
    const submitDisabled = submitting || !dirty || (!valid && !hasSubmitErrors);

    const label = startCase(pbj.schema().getQName().getMessage());
    const { values } = useFormState({ subscription: { values: true } });
    const contentStatus = values.content_ref && getContent(values.content_ref).get('status').getValue();

    delegate.handleCreate = form.submit;
    delegate.handleSubmit = async (values) => {
      try {
        await progressIndicator.show(`Creating ${label}...`);

        values.app_ref = appRef;
        const content = getContent(values.content_ref);
        if (content) {
          values.title = content.get('title');
        }

        if (!content) {
          values.send_on_publish = false;
        }

        if (values.send_on_publish) {
          values.send_at = null;
        }

        await dispatch(createNode(values, form, pbj));
        props.toggle();
        await progressIndicator.close();
        await navigate(nodeUrl(pbj, 'edit'));
        toast({ title: `${label} created.` });
      } catch (e) {
        await progressIndicator.close();
        return { [FORM_ERROR]: getFriendlyErrorMessage(e) };
      }
    };

    return (
      <>
        <ModalHeader>Create {label}</ModalHeader>
        <Form onSubmit={handleSubmit} autoComplete="off">
          <ModalBody>
            {hasSubmitErrors && <FormErrors errors={submitErrors} />}
            <ContentRefField contentRef={contentRef} />
            <SendOptionsField contentStatus={contentStatus} />
            {!values.content_ref && (
              <>
                <TextField name="title" label="Title" required />
                <TextareaField name="body" label="Body" rows={5} required />
              </>
            )}
            <ModalFields {...props} contentStatus={contentStatus} />
          </ModalBody>
        </Form>
        <ModalFooter>
          <ActionButton
            text="Back"
            onClick={props.onGoBack}
            color="hover-bg"
            tabIndex="-2"
          />
          <ActionButton
            text="Cancel"
            onClick={props.toggle}
            icon="close-sm"
            color="light"
            tabIndex="-1"
          />
          <ActionButton
            type="submit"
            text={`Create ${label}`}
            onClick={delegate.handleCreate}
            disabled={submitDisabled}
            icon="plus-outline"
            color="primary"
          />
        </ModalFooter>
      </>
    );
  });
}
