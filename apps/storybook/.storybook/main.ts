import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../stories/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  viteFinal: async (config) => {
    // Optimize workspace dependencies
    if (config.optimizeDeps) {
      config.optimizeDeps.include = [
        ...(config.optimizeDeps.include || []),
        '@dbds/components',
        '@dbds/charts',
        '@dbds/tokens',
      ];
    }

    // Ensure workspace packages are resolved correctly
    if (config.resolve) {
      config.resolve.dedupe = [
        ...(config.resolve.dedupe || []),
        'react',
        'react-dom',
      ];
    }

    return config;
  },
};

export default config;
