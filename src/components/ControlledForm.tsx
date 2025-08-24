import { useAppDispatch, useAppSelector } from '../store/hooks';
import type { RootState } from '../store/store';
import { useForm } from 'react-hook-form';
import { customResolver, type FormShemaType } from '../schema/formShema';
import { cn } from '../utils/cn';
import { submitFormWithDelay } from '../store/formsSlice';
import { fileToBase64 } from '../utils/fileToBase64';
import ControlledPasswordStrength from './ControlledPasswordStrength';

export default function ControlledForm({
  handleClose,
}: {
  handleClose: () => void;
}) {
  const dispatch = useAppDispatch();
  const countries = useAppSelector(
    (state: RootState) => state.countries.CountryStore
  );

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid, isSubmitting },
  } = useForm<FormShemaType>({
    resolver: customResolver,
    mode: 'onChange',
    defaultValues: {
      gender: 'male',
    },
  });

  const onSubmit = async (data: FormShemaType) => {
    const formData = {
      ...data,
      age: Number(data.age),
      picture: await fileToBase64(data.picture),
      id: crypto.randomUUID(),
    };
    dispatch(submitFormWithDelay(formData));
    handleClose();
  };

  return (
    <form
      method="dialog"
      onClick={(e) => e.stopPropagation()}
      onSubmit={handleSubmit(onSubmit)}
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
          type="text"
          className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          {...register('name')}
        />
        <div className="h-5">
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
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
          {...register('age')}
          type="number"
          className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        <div className="h-5">
          {errors.age && (
            <p className="text-sm text-red-500">{errors.age.message}</p>
          )}
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
          {...register('email')}
          className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        <div className="h-5">
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
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
          {...register('password')}
          type="password"
          placeholder=" "
          className="peer mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />

        <ControlledPasswordStrength data={watch('password')} />

        <div className="h-10">
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>
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
          {...register('confirmPassword')}
          type="password"
          className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        <div className="h-5">
          {errors.confirmPassword && (
            <p className="text-sm text-red-500">
              {errors.confirmPassword.message}
            </p>
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
              {...register('gender')}
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
              {...register('gender')}
              value="female"
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="female" className="ml-2 text-sm text-gray-700">
              Female
            </label>
          </div>
        </div>
        <div className="h-5">
          <p className="text-sm text-red-500">{errors.gender?.message}</p>
        </div>
      </div>

      <div className="flex items-center">
        <input
          id="tc"
          {...register('tc')}
          type="checkbox"
          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <label htmlFor="tc" className="ml-2 text-sm text-gray-700">
          Accept Terms and Conditions
        </label>
      </div>
      <div className="h-5">
        <p className="text-sm text-red-500">{errors.tc?.message}</p>
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
          {...register('picture')}
          type="file"
          accept="image/png, image/jpeg"
          className="mt-1 block w-full cursor-pointer rounded-md border border-gray-300 text-sm text-gray-900 focus:outline-none"
        />
        <div className="h-5">
          <p className="text-sm text-red-500">{errors.picture?.message}</p>
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
          {...register('country')}
          className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        <datalist id="countriesList">
          {countries.map((c) => (
            <option key={c} value={c} />
          ))}
        </datalist>
        <div className="h-7">
          <p className="text-sm text-red-500">{errors.country?.message}</p>
        </div>
      </div>

      <button
        type="submit"
        disabled={!isValid || isSubmitting}
        className={cn(
          'w-full rounded-md px-4 py-2 font-medium text-white focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none',
          !isValid
            ? 'cursor-not-allowed bg-gray-400'
            : 'bg-blue-500 hover:bg-blue-600'
        )}
      >
        {isSubmitting ? 'Submitting' : 'Submit'}
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
