import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import RegisterScreen from "../screens/RegisterScreen";
import axios from "axios";
import { NavigationContainer } from "@react-navigation/native";

jest.mock("axios");

const mockNavigate = jest.fn();

jest.mock("@react-navigation/native", () => {
  const actualNav = jest.requireActual("@react-navigation/native");
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockNavigate,
      goBack: jest.fn(),
    }),
  };
});

describe("RegisterScreen", () => {
  it("should display registration form and register a user", async () => {
    axios.post.mockResolvedValueOnce({
      data: { message: "User registered successfully" },
    });

    const { getByPlaceholderText, getByText } = render(
      <NavigationContainer>
        <RegisterScreen />
      </NavigationContainer>
    );

    fireEvent.changeText(getByPlaceholderText("Enter your name"), "John Doe");
    fireEvent.changeText(
      getByPlaceholderText("Enter your email"),
      "john@example.com"
    );
    fireEvent.changeText(
      getByPlaceholderText("Enter your password"),
      "password123"
    );
    fireEvent.changeText(
      getByPlaceholderText("Enter your image URL"),
      "http://example.com/john.jpg"
    );

    fireEvent.press(getByText("Register"));

    await waitFor(() =>
      expect(axios.post).toHaveBeenCalledWith(
        "http://192.168.0.154:8000/register",
        {
          name: "John Doe",
          email: "john@example.com",
          password: "password123",
          image: "http://example.com/john.jpg",
        }
      )
    );

    await waitFor(() =>
      expect(getByText("Registration successful")).toBeTruthy()
    );
  });

  it("should show an error alert on registration failure", async () => {
    axios.post.mockRejectedValueOnce(new Error("Registration failed"));

    const { getByPlaceholderText, getByText } = render(
      <NavigationContainer>
        <RegisterScreen />
      </NavigationContainer>
    );

    fireEvent.changeText(getByPlaceholderText("Enter your name"), "John Doe");
    fireEvent.changeText(
      getByPlaceholderText("Enter your email"),
      "john@example.com"
    );
    fireEvent.changeText(
      getByPlaceholderText("Enter your password"),
      "password123"
    );
    fireEvent.changeText(
      getByPlaceholderText("Enter your image URL"),
      "http://example.com/john.jpg"
    );

    fireEvent.press(getByText("Register"));

    await waitFor(() =>
      expect(axios.post).toHaveBeenCalledWith(
        "http://192.168.0.154:8000/register",
        {
          name: "John Doe",
          email: "john@example.com",
          password: "password123",
          image: "http://example.com/john.jpg",
        }
      )
    );

    await waitFor(() => expect(getByText("Registration Error")).toBeTruthy());
  });
});
