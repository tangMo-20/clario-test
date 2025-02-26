import { Button } from '@/components/Button/Button';
import { Input } from '@/components/Input/Input';
import { Form, Formik } from 'formik';
import { PASSWORD_RULES, validationSchema } from './schema';
import { ChangeEvent, useState } from 'react';
import clsx from 'clsx';
import styles from './SignUp.module.scss';

type FormValues = {
  email: string;
  password: string;
};

const defaultFormValues = { email: '', password: '' };

export const SignUp = () => {
  const [password, setPassword] = useState(defaultFormValues.password);

  const handleSignUp = (values: FormValues) => {
    console.log(values);
  };

  const validatePassword = (value: string) => {
    const isValid = PASSWORD_RULES.reduce((acc, { test }) => {
      if (!acc) {
        return false;
      }

      return test(value);
    }, true);

    return isValid ? '' : 'Not valid';
  };

  return (
    <Formik<FormValues>
      initialValues={defaultFormValues}
      validationSchema={validationSchema}
      onSubmit={handleSignUp}
      validateOnChange={false}
      validateOnBlur={false}
    >
      {({ isSubmitting, touched, handleChange }) => {
        return (
          <Form id="signUp" className={styles.form}>
            <span className={styles.title}>Sign up</span>
            {/* email only validated on submit */}
            <Input name="email" placeholder="Email" />
            <div>
              {/* password is validated in real-time */}
              <Input
                name="password"
                placeholder="Create a password"
                type="password"
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setPassword(e.target.value);
                  handleChange(e);
                }}
                isInternalErrorMessage={false}
                realTimeValidation={validatePassword}
              />
              <div className={styles.passwordRules}>
                {PASSWORD_RULES.map(({ message, test }) => (
                  <span
                    key={message}
                    className={clsx({
                      [styles.success]: touched.password && test(password),
                      [styles.error]: touched.password && !test(password)
                    })}
                  >
                    {message}
                  </span>
                ))}
              </div>
            </div>
            <Button type="submit" title="Sign up" disabled={isSubmitting} />
          </Form>
        );
      }}
    </Formik>
  );
};
