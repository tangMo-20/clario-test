export const BUTTON_VARIANT = {
  PRIMARY: 'PRIMARY',
  SECONDARY: 'SECONDARY'
} as const;

export const BUTTON_SIZE = {
  SM: 'SM',
  LG: 'LG',
  FULLSCREEN: 'FULLSCREEN'
} as const;

export type ButtonVariant = keyof typeof BUTTON_VARIANT;
export type ButtonSize = keyof typeof BUTTON_SIZE;
