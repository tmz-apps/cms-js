import React from 'react';
import { ActionButton } from '@tmz-apps/cms-js/components/index.js';

export default function SliderBlockModalFooter(props) {
  const { step, setStep, isNew, title, showSubmit, submitDisabled, onSubmit, toggle } = props;

  if (step === 1) {
    return (
      <>
        <ActionButton
          text={isNew ? 'Cancel' : 'Close'}
          onClick={toggle}
          icon="close-sm"
          color="light"
          tabIndex="-1"
        />
        <ActionButton
          text="Continue"
          onClick={() => setStep(2)}
          icon="arrow-right"
          color="primary"
        />
      </>
    );
  }

  return (
    <>
      <ActionButton
        text="Back"
        onClick={() => setStep(1)}
        color="hover-bg"
        tabIndex="-2"
      />
      <ActionButton
        text={isNew ? 'Cancel' : 'Close'}
        onClick={toggle}
        icon="close-sm"
        color="light"
        tabIndex="-1"
      />
      {showSubmit && (
        <ActionButton
          type="submit"
          text={isNew ? `Add ${title}` : `Update ${title}`}
          onClick={onSubmit}
          disabled={submitDisabled}
          icon={isNew ? 'plus-outline' : 'save'}
          color="primary"
        />
      )}
    </>
  );
}
