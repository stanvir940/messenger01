// jestSetup.js
jest.mock("@react-native-async-storage/async-storage", () => ({
  __esModule: true,
  default: jest.fn(),
  useAsyncStorage: jest.fn(),
  useAsyncStorageTransaction: jest.fn(),
}));
