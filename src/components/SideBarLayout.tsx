import { useNavigate } from 'react-router';
import { cn } from '../utils/cn';

export default function SideBar({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const back = () => {
    navigate(-1);
  };
  return (
    <>
      <div
        onClick={back}
        className="fixed top-0 left-0 h-full w-full cursor-pointer bg-black/30"
      ></div>
      <aside
        className={cn(
          'group sticky top-4 my-4 mr-4 flex h-[75vh] w-full flex-col transition-all hover:grow-[1.25]',
          'justify-center self-start rounded-lg bg-white align-middle shadow-md md:w-1/4'
        )}
      >
        {children}
      </aside>
    </>
  );
}
