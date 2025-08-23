import { useState } from 'react';
import UncontrolledForm from './components/UncontrolledForm';
import { createPortal } from 'react-dom';
import ControlledForm from './components/ControlledForm';
import { useAppSelector } from './store/hooks';
import type { RootState } from './store/store';
import Card from './components/Card';
import { cn } from './utils/cn';

export default function App() {
  const [formType, setFormType] = useState<
    'controlled' | 'uncontrolled' | null
  >(null);

  const handleClose = () => {
    setFormType(null);
  };

  const storeData = useAppSelector(
    (state: RootState) => state.cards.cardsStore
  );

  return (
    <>
      <header className="bg-white p-6 shadow-md">
        <button
          onClick={() => {
            setFormType('controlled');
          }}
          className="rounded-lg border-2 border-black bg-black px-6 py-3 font-medium text-white transition-all duration-200 hover:bg-white hover:text-black focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:outline-none active:bg-gray-100 disabled:cursor-not-allowed disabled:border-gray-300 disabled:bg-gray-300 disabled:text-gray-500"
        >
          controlled form
        </button>
        <button
          onClick={() => {
            setFormType('uncontrolled');
          }}
          className="ml-4 rounded-lg border-2 border-black bg-black px-6 py-3 font-medium text-white transition-all duration-200 hover:bg-white hover:text-black focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:outline-none active:bg-gray-100 disabled:cursor-not-allowed disabled:border-gray-300 disabled:bg-gray-300 disabled:text-gray-500"
        >
          uncontrolled form
        </button>
      </header>

      {Object.keys(storeData).length > 0 && (
        <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2 lg:grid-cols-3">
          {Object.values(storeData).map((el, idx) => (
            <li
              key={idx}
              className={cn(
                'list-none rounded-xl border border-gray-200 p-6 shadow-lg transition-shadow duration-300 hover:shadow-xl',
                el.status === 'fulfilled' ? 'bg-white' : 'bg-green-200'
              )}
            >
              <Card el={el.data} />
            </li>
          ))}
        </div>
      )}

      {formType &&
        createPortal(
          <>
            <dialog
              ref={(ref) => {
                ref?.showModal();
              }}
              onClick={handleClose}
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
        )}
    </>
  );
}
