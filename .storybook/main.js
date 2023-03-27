const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/preset-create-react-app",
    // {
    //   name: '@storybook/addon-styling',
    //   options: {
    //     // Check out https://github.com/storybookjs/addon-styling/blob/main/docs/api.md
    //     // For more details on this addon's options.
    //     postCss: true,
    //   },
    // },
  ],
  "framework": "@storybook/react",
  "core": {
    builder: 'webpack5',
  },
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.css$/,
      use: [
        {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              plugins: [require('tailwindcss'), require('autoprefixer')],
            },
          },
        },
      ],
      include: path.resolve(__dirname, '../'),
    });
    config.resolve.plugins = [
      ...(config.resolve.plugins || [])
    ];
    return config;
  },
}