import * as z from 'zod';
import { countries } from '../utils/countries';

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
      .regex(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*(),.?":{}|<>]).*$/, {
        message:
          'Password must contain at least 1 number, 1 uppercase letter, 1 lowercase letter, and 1 special character',
      }),
    confirmPassword: z
      .string()
      .min(1, { message: 'Confirm password is required' }),
    gender: z.enum(['male', 'female'], {
      message: 'Please select a gender',
    }),
    tc: z.string({
      message: 'You must accept the Terms and Conditions',
    }),
    picture: z.file().mime(['image/png', 'image/jpeg']),
    country: z
      .string()
      .min(1, { message: 'Please select a country' })
      .refine((value) => countries.includes(value), {
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
