module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['src'],
  setupFiles: ['dotenv/config'],
  moduleNameMapper: {
    '^~/(.*)$': '<rootDir>/$1',
  },
  transform: {
    '.(ts|tsx)': 'ts-jest',
  },
};
