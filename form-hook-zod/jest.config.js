

module.exports={
  testEnvironment: 'jest-environment-jsdom',
  testPathIgnorePatterns:['/node_modules/', '/.next/'],
  collectCoverage: true,
  collectCoverageFrom: ['scr/**/*.{js,jsx,ts,tsx}',],
  setupFilesAfterEnv: ['<rootDir>/.jest/setup-test.ts'],
  
  
}