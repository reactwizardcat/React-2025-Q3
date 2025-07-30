import { NavLink } from 'react-router';
import { cn } from '../utils/cn';

export default function Header({ children }: { children?: React.ReactNode }) {
  return (
    <>
      <header
        className={cn(
          'mx-4 mt-3 flex flex-col gap-3 rounded-t-4xl bg-white bg-[url("/fon2.png")]',
          'bg-cover bg-center bg-no-repeat px-5 py-4 shadow-md md:flex-row'
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
                    'text-xl font-semibold text-white transition duration-300 text-shadow-sm hover:text-red-600 hover:text-shadow-white',
                    isActive
                      ? 'pointer-events-none font-medium text-red-600 underline underline-offset-4 text-shadow-white'
                      : 'text-shadow-black'
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
                    'text-xl font-semibold text-white transition duration-300 text-shadow-sm hover:text-red-600 hover:text-shadow-white',
                    isActive
                      ? 'pointer-events-none font-medium text-red-600 underline underline-offset-4 text-shadow-white'
                      : 'text-shadow-black'
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
