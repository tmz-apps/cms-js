import React, { useMemo, useState } from 'react';
import { FORM_ERROR } from 'final-form';
import startCase from 'lodash-es/startCase.js';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { Form, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { ActionButton, FormErrors, Icon, useFormContext, withForm, withPbj } from '@tmz-apps/cms-js/components/index.js';
import Message from '@gdbots/pbj/Message.js';
import FormMarshaler from '@tmz-apps/cms-js/utils/FormMarshaler.js';
import getRootFields from '@tmz-apps/cms-js/utils/getRootFields.js';
import getFriendlyErrorMessage from '@tmz-apps/cms-js/plugins/pbjx/utils/getFriendlyErrorMessage.js';
import { INSERT_BLOCK_COMMAND, INSERT_BLOCK_AT_TOP_COMMAND } from '@tmz-apps/cms-js/blocksmith/plugins/BlocksmithPlugin.js';
import config from '@tmz-apps/cms-js/blocksmith/config.js';

function BlockModal(props) {
  const {
    isNew,
    canUpdate = true,
    canCreate = true,
    editMode,
    ModalFields,
    Footer,
    delegate,
    form,
    formState,
    handleSubmit,
    pbj
  } = props;

  const { dirty, hasSubmitErrors, submitErrors, submitting, valid } = formState;
  const submitDisabled = submitting || !valid || (!isNew && !dirty);
  const showSubmit = editMode && ((!isNew && canUpdate) || (isNew && canCreate));
  const [step, setStep] = useState(1);
  const schema = pbj.schema();

  delegate.handleUpdate = form.submit;
  delegate.handleSubmit = async (values) => {
    try {
      const oldObj = FormMarshaler.marshal(pbj, { skipValidation: true });
      const paths = getRootFields(Object.keys(formState.dirtyFields));
      paths.forEach(path => delete oldObj[path]);
      const newObj = { ...oldObj, ...values };
      const newPbj = await FormMarshaler.unmarshal(newObj);
      props.onUpdate(newPbj);
      props.toggle();
    } catch (e) {
      return { [FORM_ERROR]: getFriendlyErrorMessage(e) };
    }
  };

  const type = schema.getCurie().getMessage();
  const icon = config.blocks[type]?.icon || type;
  const title = config.blocks[type]?.title || startCase(type);

  return (
    <Modal isOpen size="lg" centered toggle={props.toggle}>
      <ModalHeader toggle={props.toggle}>
        <Icon imgSrc={icon} size="lg" className="me-2" />
        {title}
      </ModalHeader>
      <ModalBody>
        {hasSubmitErrors && <FormErrors errors={submitErrors} />}
        <Form onSubmit={handleSubmit} autoComplete="off">
          <ModalFields {...props} step={step} setStep={setStep} />
        </Form>
      </ModalBody>
      <ModalFooter>
        {Footer ? (
          <Footer
            step={step}
            setStep={setStep}
            isNew={isNew}
            title={title}
            showSubmit={showSubmit}
            submitDisabled={submitDisabled}
            onSubmit={delegate.handleUpdate}
            toggle={props.toggle}
          />
        ) : (
          <>
            <ActionButton
              text={isNew ? 'Cancel' : 'Close'}
              onClick={props.toggle}
              icon="close-sm"
              color="light"
              tabIndex="-1"
            />
            {showSubmit && (
              <ActionButton
                type="submit"
                text={isNew ? `Add ${title}` : `Update ${title}`}
                onClick={delegate.handleUpdate}
                disabled={submitDisabled}
                icon={isNew ? 'plus-outline' : 'save'}
                color="primary"
              />
            )}
          </>
        )}
      </ModalFooter>
    </Modal>
  );
}

// Footer, when given, replaces the default Cancel/Add buttons so a block
// can walk the user through steps. It receives step/setStep along with
// the same submit wiring the default footer uses.
export default function withBlockModal(Component, { Footer = null } = {}) {
  return function ComponentWithBlockModal(props) {
    const {
      curie,
      pbj,
      canUpdate = false,
      canCreate = false,
      afterNodeKey = null,
      insertAtTop = false
    } = props;
    const BlockModalWithPbj = useMemo(() => {
      return pbj instanceof Message ? withForm(BlockModal) : withPbj(withForm(BlockModal), curie, pbj);
    }, [curie, pbj]);

    const [editor] = useLexicalComposerContext();
    const formContext = useFormContext();
    const { editMode } = formContext;

    const isNew = !props.onUpdate;
    const onUpdate = !isNew ? props.onUpdate : (newPbj) => {
      const command = insertAtTop ? INSERT_BLOCK_AT_TOP_COMMAND : INSERT_BLOCK_COMMAND;
      editor.dispatchCommand(command, { newPbj, afterNodeKey });
    };

    return (
      <BlockModalWithPbj
        {...props}
        ModalFields={Component}
        Footer={Footer}
        editor={editor}
        editMode={editMode && (canUpdate || canCreate)}
        containerFormContext={formContext}
        onUpdate={onUpdate}
        isNew={isNew}
      />
    );
  };
}
