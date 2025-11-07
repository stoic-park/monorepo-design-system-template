/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require('../../packages/theme')],
  content: [
    './stories/**/*.{js,jsx,ts,tsx}',
    '../../packages/components/src/**/*.{js,jsx,ts,tsx}',
  ],
};
