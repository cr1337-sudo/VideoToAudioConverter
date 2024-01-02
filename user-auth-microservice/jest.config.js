module.exports = {
  testMatch: ['**/?(*.)+(spec|test).ts', '**/*.steps.ts'],
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
      '^.+\\.tsx?$': 'ts-jest'
  }
};
