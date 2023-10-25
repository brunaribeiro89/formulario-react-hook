

module.exports={
  testEnvironment: 'jest-environment-jsdom',
  testPathIgnorePatterns:['/node_modules/', '/.next/'],
  collectCoverage: true,
  coverageDirectory: './coverage/',
  collectCoverageFrom: ['scr/**/*.{js,jsx,ts,tsx}',],
  setupFilesAfterEnv: ['<rootDir>/.jest/setup-test.ts'],
  
  
}