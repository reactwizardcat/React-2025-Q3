import { Link, useLocation } from 'react-router';

export default function NotFoundPage() {
  const location = useLocation();
  const backLink = location.state?.from || '/';
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-2.5">
      <h2 className="text-2xl">This page does not exist.</h2>
      <Link to={backLink}>Go back</Link>
    </div>
  );
}
