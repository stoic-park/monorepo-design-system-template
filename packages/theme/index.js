/* eslint-disable @typescript-eslint/no-var-requires */
const {
  colors,
  typography,
  spacing,
  radius,
  shadows,
} = require('@design-system/tokens');

/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        ...colors,
      },
      fontFamily: {
        ...typography.fontFamily,
      },
      fontSize: {
        ...typography.fontSize,
      },
      fontWeight: {
        ...typography.fontWeight,
      },
      lineHeight: {
        ...typography.lineHeight,
      },
      letterSpacing: {
        ...typography.letterSpacing,
      },
      spacing: {
        ...spacing,
      },
      borderRadius: {
        ...radius,
      },
      boxShadow: {
        ...shadows,
      },
    },
  },
  plugins: [],
};
