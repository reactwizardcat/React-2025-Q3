import * as z from 'zod';

export const FormSchema = z
  .object({
    name: z
      .string()
      .min(1, { message: 'Name is required' })
      .refine((val) => /^[A-Z]/.test(val.charAt(0)), {
        message: 'Name must start with an uppercase letter',
      }),
    age: z.number().positive({ message: 'Age must be a positive number' }),
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
    tc: z.boolean().refine((val) => val === true, {
      message: 'You must accept the Terms and Conditions',
    }),
    picture: z.string().optional(),
    country: z.string().min(1, { message: 'Please select a country' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type FormShemaType = z.infer<typeof FormSchema>;
export type FormErrors = Partial<Record<string, string[]>>;
