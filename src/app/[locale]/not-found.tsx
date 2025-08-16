import { Link } from '@/i18n/navigation';

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-2.5">
      <h2 className="text-2xl">This page does not exist.</h2>
      <Link
        className="text-blue-400 underline-offset-5 hover:underline"
        href="/"
      >
        Go back
      </Link>
    </main>
  );
}
