import axios from "axios";
import mockAxios from "axios-mock-adapter";
const mock = new mockAxios(axios);
mock
  .onPost("http://192.168.0.154:8000/register")
  .reply(200, { message: "User registered successfully" });
// jest.mock("axios");

jest.mock("@react-native-async-storage/async-storage", () => {
  return {
    getItem: jest.fn(() => Promise.resolve(null)),
    setItem: jest.fn(() => Promise.resolve()),
    removeItem: jest.fn(() => Promise.resolve()),
  };
});

jest.mock("@expo/vector-icons", () => {
  return {
    Ionicons: "Ionicons",
    MaterialIcons: "MaterialIcons",
    // Add other icons as needed
  };
});
