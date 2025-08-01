import { NavLink } from 'react-router';
import { cn } from '../utils/cn';
import { useTheme } from '../hooks/useTheme';

export default function Header({ children }: { children?: React.ReactNode }) {
  const { theme, toggleTheme } = useTheme();
  return (
    <header
      className={cn(
        'mx-4 mt-3 flex flex-col gap-3 rounded-t-4xl bg-white bg-[url("/fon2.png")]',
        'bg-cover bg-center bg-no-repeat px-5 py-4 shadow-md md:flex-row'
      )}
    >
      {children}
      <nav className="md: mx-3 flex flex-row justify-between gap-4 md:flex-col">
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
        <div className="flex justify-center">
          <label className="relative inline-flex cursor-pointer items-center">
            <input
              className="peer sr-only"
              type="checkbox"
              onChange={toggleTheme}
              checked={theme}
            />
            <div className="h-10 w-20 rounded-full bg-gradient-to-r from-yellow-300 to-orange-400 transition-all duration-500 peer-checked:from-blue-400 peer-checked:to-indigo-500 after:absolute after:top-1 after:left-1 after:flex after:h-8 after:w-8 after:items-center after:justify-center after:rounded-full after:bg-white after:text-lg after:shadow-md after:transition-all after:duration-500 after:content-['☀️'] peer-checked:after:translate-x-10 peer-checked:after:content-['🌙']"></div>
          </label>
        </div>
      </nav>
    </header>
  );
}
