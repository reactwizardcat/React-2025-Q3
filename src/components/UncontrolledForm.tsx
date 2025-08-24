import { useRef, useState } from 'react';
import { FormSchema, type FormErrors } from '../schema/formShema';
import z from 'zod';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { submitFormWithDelay } from '../store/formsSlice';
import { fileToBase64 } from '../utils/fileToBase64';
import type { RootState } from '../store/store';
import UncontrolledPasswordStrength from './UncontrolledPasswordStrength';

type RowDataType = {
  [k: string]: FormDataEntryValue;
} & {
  tc?: string;
  age?: number;
};

export default function UncontrolledForm({
  handleClose,
}: {
  handleClose: () => void;
}) {
  const [errors, setErrors] = useState<FormErrors>({});
  const formRef = useRef<HTMLFormElement>(null);

  const dispatch = useAppDispatch();
  const countries = useAppSelector(
    (state: RootState) => state.countries.CountryStore
  );

  const closeForm = () => {
    formRef.current?.reset();
    setErrors({});
    handleClose();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const rawData: RowDataType = Object.fromEntries(formData.entries());
    rawData['tc'] = formData.has('tc') ? 'true' : 'false';

    const result = FormSchema.safeParse(rawData);
    if (!result.success) {
      const flattened = z.flattenError(result.error);
      setErrors(flattened.fieldErrors);
    } else {
      const data = {
        ...result.data,
        age: Number(result.data.age),
        picture: await fileToBase64(result.data.picture),
        id: crypto.randomUUID(),
      };
      dispatch(submitFormWithDelay(data));
      closeForm();
    }
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      onClick={(e) => e.stopPropagation()}
      method="dialog"
      className="relative mx-auto max-w-md space-y-3 rounded-lg bg-white p-6 shadow-lg"
    >
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        <div className="h-5">
          {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
        </div>
      </div>

      <div>
        <label
          htmlFor="age"
          className="block text-sm font-medium text-gray-700"
        >
          Age
        </label>
        <input
          id="age"
          name="age"
          type="number"
          className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        <div className="h-5">
          {errors.age && <p className="text-sm text-red-500">{errors.age}</p>}
        </div>
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        <div className="h-5">
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email}</p>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>

        <input
          id="password"
          name="password"
          type="password"
          placeholder=" "
          className="peer mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />

        <UncontrolledPasswordStrength length={errors.password?.length} />

        <ul className="h-10 overflow-scroll">
          {errors.password &&
            errors.password.map((err, idx) => (
              <li key={idx} className="text-sm text-red-500">
                {err}
              </li>
            ))}
        </ul>
      </div>

      <div>
        <label
          htmlFor="confirmPassword"
          className="block text-sm font-medium text-gray-700"
        >
          Confirm Password
        </label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        <div className="h-5">
          {errors.confirmPassword && (
            <p className="text-sm text-red-500">{errors.confirmPassword}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Gender
        </label>
        <div className="flex space-x-4">
          <div className="flex items-center">
            <input
              id="male"
              type="radio"
              name="gender"
              defaultChecked
              value="male"
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="male" className="ml-2 text-sm text-gray-700">
              Male
            </label>
          </div>
          <div className="flex items-center">
            <input
              id="female"
              type="radio"
              name="gender"
              value="female"
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="female" className="ml-2 text-sm text-gray-700">
              Female
            </label>
          </div>
        </div>
        <div className="h-5">
          {errors.gender && (
            <p className="text-sm text-red-500">{errors.gender}</p>
          )}
        </div>
      </div>

      <div className="flex items-center">
        <input
          id="tc"
          name="tc"
          type="checkbox"
          value="true"
          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <label htmlFor="tc" className="ml-2 text-sm text-gray-700">
          Accept Terms and Conditions
        </label>
      </div>
      <div className="h-5">
        {errors.tc && <p className="text-sm text-red-500">{errors.tc}</p>}
      </div>

      <div>
        <label
          htmlFor="picture"
          className="block text-sm font-medium text-gray-700"
        >
          Upload Picture
        </label>
        <input
          id="picture"
          name="picture"
          type="file"
          accept="image/png, image/jpeg"
          className="mt-1 block w-full cursor-pointer rounded-md border border-gray-300 text-sm text-gray-900 focus:outline-none"
        />
        <div className="h-5">
          {errors.picture && (
            <p className="text-sm text-red-500">{errors.picture[0]}</p>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor="country"
          className="block text-sm font-medium text-gray-700"
        >
          Country
        </label>
        <input
          list="countriesList"
          id="country"
          name="country"
          className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        <datalist id="countriesList">
          {countries.map((c) => (
            <option key={c} value={c} />
          ))}
        </datalist>
        <div className="h-7">
          {errors.country && (
            <p className="text-sm text-red-500">{errors.country}</p>
          )}
        </div>
      </div>

      <button
        type="submit"
        className="w-full rounded-md bg-blue-500 px-4 py-2 font-medium text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
      >
        Submit
      </button>
      <button
        type="button"
        onClick={handleClose}
        className="absolute top-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-gray-600 transition-colors hover:bg-gray-300 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
        aria-label="Close form"
      >
        <svg
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </form>
  );
}
