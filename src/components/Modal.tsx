import { createPortal } from 'react-dom';
import UncontrolledForm from './UncontrolledForm';
import ControlledForm from './ControlledForm';

export default function Modal({
  formType,
  handleClose,
}: {
  formType: 'uncontrolled' | 'controlled' | null;
  handleClose: () => void;
}) {
  return createPortal(
    <>
      <dialog
        ref={(ref) => {
          ref?.showModal();
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            handleClose();
          }
        }}
        role="dialog"
        onClose={handleClose}
        className="fixed top-1/2 left-1/2 min-w-md -translate-x-1/2 -translate-y-1/2 transform rounded-lg bg-white shadow-lg"
      >
        {formType === 'uncontrolled' ? (
          <UncontrolledForm handleClose={handleClose} />
        ) : (
          <ControlledForm handleClose={handleClose} />
        )}
      </dialog>
    </>,
    document.body
  );
}
