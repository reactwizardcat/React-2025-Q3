import { cn } from '../../utils/cn';

export default function ErrorButton() {
  return (
    <button
      className={cn(
        'fixed right-3 bottom-3 rounded-xl bg-red-600 px-3.5 py-2.5 text-white duration-300',
        'md:right-16 md:bottom-10 md:shadow-red-300/50 md:hover:-translate-y-2',
        'md:hover:bg-red-500 md:hover:shadow-md md:active:-translate-y-1 md:active:shadow-none'
      )}
    >
      Download
    </button>
  );
}
