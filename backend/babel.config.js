// babel.config.js
export default {
    presets: [
      '@babel/preset-env', // This preset ensures compatibility with modern JS syntax
    ],
    plugins: [
      '@babel/plugin-transform-modules-commonjs', // This plugin enables ES module transformation
    ]
  };
  