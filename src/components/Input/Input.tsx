import { ChangeEvent, HTMLInputTypeAttribute, useMemo, useState } from 'react';
import { INPUT_SIZE, INPUT_VARIANT, InputSize, InputVariant } from './types';
import { ErrorMessage, Field, FieldConfig, FieldProps } from 'formik';
import styles from './Input.module.scss';
import clsx from 'clsx';
import Image from 'next/image';

type Props = FieldConfig & {
  type?: HTMLInputTypeAttribute;
  variant?: InputVariant;
  size?: InputSize;
  placeholder?: string;
  isInternalErrorMessage?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  realTimeValidation?: (value: string) => string;
};

const getInputClasses = ({
  type,
  variant,
  size
}: {
  type: HTMLInputTypeAttribute;
  variant: InputVariant;
  size: InputSize;
}) => {
  return {
    [styles.primary]: variant === INPUT_VARIANT.PRIMARY,
    [styles.secondary]: variant === INPUT_VARIANT.SECONDARY,
    [styles.sm]: size === INPUT_SIZE.SM,
    [styles.lg]: size === INPUT_SIZE.LG,
    [styles.fullscreen]: size === INPUT_SIZE.FULLSCREEN,
    [styles.password]: type === 'password'
  };
};

export const Input = ({
  name,
  type = 'text',
  variant = INPUT_VARIANT.PRIMARY,
  size = INPUT_SIZE.LG,
  placeholder,
  isInternalErrorMessage = true,
  realTimeValidation,
  onChange
}: Props) => {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const handleTogglePasswordShow = () => {
    setIsShowPassword((prev) => !prev);
  };

  const computedClasses = useMemo(
    () => getInputClasses({ type, variant, size }),
    [type, variant, size]
  );

  const computedType = useMemo(() => {
    if (type === 'password' && isShowPassword) {
      return 'text';
    }

    return type;
  }, [type, isShowPassword]);

  return (
    <Field name={name} onChange={onChange}>
      {({ field, form }: FieldProps) => {
        const isError = realTimeValidation
          ? Boolean(realTimeValidation(field.value))
          : Boolean(form.errors[name]);

        return (
          <div className={styles.root}>
            <input
              type={computedType}
              placeholder={placeholder}
              className={clsx(styles.input, computedClasses, {
                [styles.error]: form.touched[name] && isError,
                [styles.success]: form.touched[name] && !isError
              })}
              {...field}
              onChange={onChange ?? field.onChange}
            />
            {type === 'password' && (
              <Image
                src="/hidden-password.svg"
                className={styles.rightIcon}
                onClick={handleTogglePasswordShow}
                width={24}
                height={24}
                alt="hidden-password"
              />
            )}
            {isInternalErrorMessage && isError && (
              <ErrorMessage
                name={name}
                render={(message) => <div className={styles.errorMessage}>{message}</div>}
              />
            )}
          </div>
        );
      }}
    </Field>
  );
};
