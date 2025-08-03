import useDownloadCSV from '../hooks/useDownloadCSV';
import { clear } from '../store/cardsSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import MyButton from './UI/MyButton';

export default function Flayout({ count }: { count: number }) {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.cards.cardsStore);
  const { linkRef, saveToCSV } = useDownloadCSV(data);

  const clearSaved = () => {
    dispatch(clear());
  };
  return (
    <div className="animate-fade-in-up animate-duration-500 fixed right-3 bottom-3 flex flex-col gap-3 rounded-md bg-blue-200/40 p-4 text-red-500 md:right-16 md:bottom-10">
      <p>Marked for saving: {count}</p>
      <MyButton callback={saveToCSV}>Save CSV</MyButton>
      <a
        href={''}
        ref={linkRef}
        download={`${count}_items.csv`}
        className="hidden"
      ></a>
      <MyButton callback={clearSaved} disabled={count === 0}>
        Clear Saved
      </MyButton>
    </div>
  );
}
