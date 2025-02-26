import { ButtonHTMLAttributes, useMemo } from 'react';
import { BUTTON_VARIANT, BUTTON_SIZE, ButtonVariant, ButtonSize } from './types';
import styles from './Button.module.scss';
import clsx from 'clsx';

type Props = {
  title: string;
  action?: () => void;
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
};

const getButtonClasses = ({ variant, size }: { variant: ButtonVariant; size: ButtonSize }) => {
  return {
    [styles.primary]: variant === BUTTON_VARIANT.PRIMARY,
    [styles.secondary]: variant === BUTTON_VARIANT.SECONDARY,
    [styles.sm]: size === BUTTON_SIZE.SM,
    [styles.lg]: size === BUTTON_SIZE.LG,
    [styles.fullscreen]: size === BUTTON_SIZE.FULLSCREEN
  };
};

export const Button = ({
  title,
  action,
  type = 'button',
  variant = BUTTON_VARIANT.PRIMARY,
  size = BUTTON_SIZE.LG,
  disabled
}: Props) => {
  const computedClasses = useMemo(() => getButtonClasses({ variant, size }), [variant, size]);

  return (
    <button
      type={type}
      onClick={action}
      className={clsx(styles.button, computedClasses)}
      disabled={disabled}
    >
      {title}
    </button>
  );
};
