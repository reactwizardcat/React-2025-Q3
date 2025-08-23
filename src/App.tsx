import { useRef, useState } from 'react';
import UncontrolledForm from './components/UncontrolledForm';
import { createPortal } from 'react-dom';

export default function App() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [showForm, setShowForm] = useState(false);

  const handleClose = () => {
    setShowForm(false);
    dialogRef.current?.close();
  };

  return (
    <>
      <header>
        <button
          onClick={() => {
            setShowForm(true);
          }}
        >
          uncontrolled form
        </button>
      </header>
      {showForm &&
        createPortal(
          <>
            <button
              className="absolute top-0 left-0 h-full w-full bg-gray-300/40"
              onClick={handleClose}
            ></button>
            <dialog
              open
              className="fixed top-1/2 left-1/2 min-w-md -translate-x-1/2 -translate-y-1/2 transform rounded-lg bg-white shadow-lg"
            >
              <UncontrolledForm handleClose={handleClose} />
            </dialog>
          </>,
          document.body
        )}
    </>
  );
}
