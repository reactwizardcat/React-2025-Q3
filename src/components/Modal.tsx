import { createPortal } from 'react-dom';

export default function Modal({
  children,
  id,
  reset,
}: {
  children: React.ReactNode;
  id: string;
  reset: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    id &&
    createPortal(
      <dialog popover="auto" id={id} onClose={() => reset('')}>
        {children}
      </dialog>,
      document.body
    )
  );
}
