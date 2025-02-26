import { object, string } from 'yup';

export const EMAIL_REGEXP = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

export const PASSWORD_LENGTH_REGEXP = /^\S{8,}$/;
export const PASSWORD_UPPERCASE_AND_LOWERCASE_REGEXP = /^(?=.*[a-z])(?=.*[A-Z]).*$/;
export const PASSWORD_ONE_DIGIT_REGEXP = /^(?=.*\d).*$/;

export const INVALID_EMAIL_MESSAGE = 'Invalid email address';
export const EMAIL_REQUIRED_MESSAGE = 'Email is required';

export const PASSWORD_LENGTH_MESSAGE = '8 characters or more (no spaces)';
export const PASSWORD_UPPERCASE_AND_LOWERCASE_MESSAGE = 'Uppercase and lowercase letters';
export const PASSWORD_ONE_DIGIT_MESSAGE = 'At least one digit';
export const PASSWORD_REQUIRED_MESSAGE = 'Password is required';

export const PASSWORD_RULES = [
  { message: PASSWORD_LENGTH_MESSAGE, test: (value: string) => PASSWORD_LENGTH_REGEXP.test(value) },
  {
    message: PASSWORD_UPPERCASE_AND_LOWERCASE_MESSAGE,
    test: (value: string) => PASSWORD_UPPERCASE_AND_LOWERCASE_REGEXP.test(value)
  },
  {
    message: PASSWORD_ONE_DIGIT_MESSAGE,
    test: (value: string) => PASSWORD_ONE_DIGIT_REGEXP.test(value)
  }
];

export const validationSchema = object({
  email: string().email(INVALID_EMAIL_MESSAGE).required(EMAIL_REQUIRED_MESSAGE),
  password: string()
    .trim()
    .matches(PASSWORD_LENGTH_REGEXP, PASSWORD_LENGTH_MESSAGE)
    .matches(PASSWORD_UPPERCASE_AND_LOWERCASE_REGEXP, PASSWORD_UPPERCASE_AND_LOWERCASE_MESSAGE)
    .matches(PASSWORD_ONE_DIGIT_REGEXP, PASSWORD_ONE_DIGIT_MESSAGE)
    .required(PASSWORD_REQUIRED_MESSAGE)
});
