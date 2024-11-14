// jest.config.cjs
module.exports = {
  transform: {
    '^.+\\.svelte$': 'svelte-jester', // Transformacja plików `.svelte`
    '^.+\\.(js|mjs|cjs|jsx)$': 'babel-jest', // Transformacja plików `.js`
  },
  transformIgnorePatterns: [
    '/node_modules/(?!@testing-library/svelte|svelte)', // Umożliwia przekształcanie tych modułów
  ],
  moduleFileExtensions: ['js', 'svelte'], // Obsługiwane rozszerzenia plików
  setupFilesAfterEnv: ['<rootDir>/jest-setup.js'], // Plik inicjalizujący testy
  testEnvironment: 'jest-environment-jsdom', // Środowisko testowe dla DOM
};
