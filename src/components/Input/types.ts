export const INPUT_VARIANT = {
  PRIMARY: 'PRIMARY',
  SECONDARY: 'SECONDARY'
} as const;

export const INPUT_SIZE = {
  SM: 'SM',
  LG: 'LG',
  FULLSCREEN: 'FULLSCREEN'
} as const;

export type InputVariant = keyof typeof INPUT_VARIANT;
export type InputSize = keyof typeof INPUT_SIZE;
