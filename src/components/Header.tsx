import { NavLink } from 'react-router';
import { cn } from '../utils/cn';

export default function HeaderLayout({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <>
      <header
        className={cn(
          'mx-4 mt-3 flex flex-col gap-3 rounded-t-4xl bg-white bg-[url("/fon2.png")] px-5 py-4 shadow-md md:flex-row',
          'bg-cover bg-center bg-no-repeat'
        )}
      >
        {children}
        <nav className="mx-3 self-auto md:self-center">
          <ul className="flex items-center justify-evenly space-x-6">
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  cn(
                    'text-gray-700 transition-colors duration-200 hover:text-red-600',
                    isActive
                      ? 'pointer-events-none font-medium text-red-600 underline underline-offset-4'
                      : ''
                  )
                }
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/search"
                className={({ isActive }) =>
                  cn(
                    'text-gray-700 transition-colors duration-200 hover:text-red-600',
                    isActive
                      ? 'pointer-events-none font-medium text-red-600 underline underline-offset-4'
                      : ''
                  )
                }
              >
                Home
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
