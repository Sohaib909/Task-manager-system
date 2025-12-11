module.exports = {
  testEnvironment: 'node',
  testMatch: [
    '**/__tests__/**/*.test.js',
    '**/?(*.)+(spec|test).js'
  ],
  collectCoverageFrom: [
    'server.js',
    '!**/node_modules/**',
  ],
  moduleFileExtensions: ['js', 'json'],
}

