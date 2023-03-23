import dotenv from 'dotenv'
dotenv.config()

export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/src/**/*.test.{ts,tsx}'],
  transform: {
    '.+\\.(css|styl|less|sass|scss)$': 'jest-css-modules-transform',
  },
  globals: {
    __SERVER_PORT__: process.env.SERVER_PORT,
  },
}
