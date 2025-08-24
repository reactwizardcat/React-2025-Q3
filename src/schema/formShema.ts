import * as z from 'zod';
import { countries } from '../utils/countries';
import type { Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export const FormSchema = z
  .object({
    name: z
      .string()
      .min(1, { message: 'Name is required' })
      .refine((val) => /^[A-Z]/.test(val.charAt(0)), {
        message: 'Name must start with an uppercase letter',
      }),
    age: z
      .string()
      .min(1, { message: 'Age is required' })
      .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
        message: 'Age must be a positive number',
      }),
    email: z.email({ message: 'Invalid email format' }),
    password: z
      .string()
      .min(1, { message: 'Password is required' })
      .regex(/.*\d.*/, {
        message: 'Password must contain at least 1 number',
      })
      .regex(/.*[A-Z].*/, {
        message: 'Password must contain at least 1 uppercase letter',
      })
      .regex(/.*[a-z].*/, {
        message: 'Password must contain at least 1 lowercase letter',
      })
      .regex(/.*[!@#$%^&*(),.?":{}|<>].*/, {
        message: 'Password must contain at least 1 special character',
      }),
    confirmPassword: z.string(),
    gender: z.enum(['male', 'female'], {
      message: 'Please select a gender',
    }),
    tc: z.string().refine((val) => val === 'true', {
      message: 'You must accept the Terms and Conditions',
    }),
    picture: z
      .file()
      .refine((file) => file.size > 0, 'File is required')
      .refine((file) => file.size <= 5 * 1024 * 1024, 'Max file size is 5MB')
      .refine((file) => {
        const fileName = file.name.toLowerCase();
        return fileName.endsWith('.jpeg') || fileName.endsWith('.png');
      }, 'Only JPEG and PNG are allowed'),
    country: z.string().refine((value) => countries.includes(value), {
      message: 'Please select a valid country',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type FormShemaType = z.infer<typeof FormSchema>;
export type FormErrors = Partial<Record<string, string[]>>;
export type FormData = Omit<FormShemaType, 'picture' | 'age' | 'tc'> & {
  picture: string;
  age: number;
  id: string;
};

export const customResolver: Resolver<FormShemaType> = async (
  values,
  context,
  options
) => {
  if (
    values.picture &&
    values.picture instanceof FileList &&
    values.picture.length > 0
  ) {
    values = {
      ...values,
      picture: values.picture[0],
    };
  }
  if (values.tc !== undefined) {
    values = {
      ...values,
      tc: values.tc ? 'true' : 'false',
    };
  }
  return zodResolver(FormSchema)(values, context, options);
};
