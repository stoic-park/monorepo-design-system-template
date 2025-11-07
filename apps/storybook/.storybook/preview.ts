import type { Preview } from '@storybook/react';
import '@design-system/components/styles.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    backgrounds: {
      default: 'white',
      values: [
        {
          name: 'white',
          value: '#ffffff',
        },
        {
          name: 'black',
          value: '#000000',
        },
        {
          name: 'gray',
          value: '#f5f5f5',
        },
      ],
    },
  },
};

export default preview;
