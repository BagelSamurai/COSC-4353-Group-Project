export default {
    transform: {
      '^.+\\.[t|j]sx?$': 'babel-jest', // Ensure Babel is used for JS/JSX files
    },
    testEnvironment: 'node', // Backend test environment
    moduleFileExtensions: ['js', 'jsx', 'json'], // Support for file extensions
    transformIgnorePatterns: ['node_modules/(?!supertest)'], // Allow transforming supertest in node_modules
    extensionsToTreatAsEsm: ['.js'], // Treat .js files as ESM modules
    globals: {
      'ts-jest': {
        isolatedModules: true,
      },
    },
    moduleNameMapper: {
      '^supertest$': require.resolve('supertest'), // Ensure Supertest is properly resolved
    },
    // This allows Jest to handle ESM module imports
    preset: 'ts-jest/presets/js-with-babel', // ESM setup for Jest
  };
  