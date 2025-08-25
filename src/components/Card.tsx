import type { FormData } from '../schema/formShema';

export default function Card({ el }: { el: FormData }) {
  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="truncate text-xl font-semibold text-gray-800">
          name: {el.name}
        </h3>
        {el.gender && (
          <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 capitalize">
            {el.gender}
          </span>
        )}
      </div>

      <div className="mb-3 flex items-center">
        <svg
          className="mr-2 h-5 w-5 text-gray-500"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
        </svg>
        <p className="truncate text-gray-600">{el.email}</p>
      </div>

      {el.age && (
        <div className="mb-3 flex items-center">
          <svg
            className="mr-2 h-5 w-5 text-gray-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
              clipRule="evenodd"
            />
          </svg>
          <p className="text-gray-600">{el.age} years</p>
        </div>
      )}

      {el.country && (
        <div className="mb-3 flex items-center">
          <svg
            className="mr-2 h-5 w-5 text-gray-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
              clipRule="evenodd"
            />
          </svg>
          <p className="text-gray-600 capitalize">{el.country}</p>
        </div>
      )}

      {el.picture && (
        <div className="mb-3">
          <img
            src={el.picture}
            alt={el.name}
            className="h-48 w-full rounded-lg border border-gray-200 object-cover"
          />
        </div>
      )}
    </>
  );
}
