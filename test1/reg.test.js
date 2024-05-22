import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import RegisterScreen from '../screens/RegisterScreen';
import { NavigationContainer } from '@react-navigation/native';

// Mocking Axios module
jest.mock('axios');

describe('RegisterScreen component', () => {
  it('renders name, email, password, and image input fields', () => {
    const { getByPlaceholderText } = render(
      <NavigationContainer>
        <RegisterScreen />
      </NavigationContainer>
    );

    const nameInput = getByPlaceholderText('Enter your name');
    const emailInput = getByPlaceholderText('Enter your email');
    const passwordInput = getByPlaceholderText('Enter your password');
    const imageInput = getByPlaceholderText('Enter your image URL');

    expect(nameInput).toBeDefined();
    expect(emailInput).toBeDefined();
    expect(passwordInput).toBeDefined();
    expect(imageInput).toBeDefined();
  });

  it('updates name, email, password, and image when typing into input fields', () => {
    const { getByPlaceholderText } = render(
      <NavigationContainer>
        <RegisterScreen />
      </NavigationContainer>
    );

    const nameInput = getByPlaceholderText('Enter your name');
    const emailInput = getByPlaceholderText('Enter your email');
    const passwordInput = getByPlaceholderText('Enter your password');
    const imageInput = getByPlaceholderText('Enter your image URL');

    fireEvent.changeText(nameInput, 'John Doe');
    fireEvent.changeText(emailInput, 'john.doe@example.com');
    fireEvent.changeText(passwordInput, 'password123');
    fireEvent.changeText(imageInput, 'https://example.com/profile.jpg');

    expect(nameInput.props.value).toEqual('John Doe');
    expect(emailInput.props.value).toEqual('john.doe@example.com');
    expect(passwordInput.props.value).toEqual('password123');
    expect(imageInput.props.value).toEqual('https://example.com/profile.jpg');
  });

  it('calls handleRegister function when Register button is pressed', () => {
    const { getByText } = render(
      <NavigationContainer>
        <RegisterScreen />
      </NavigationContainer>
    );

    const registerButton = getByText('Register');
    fireEvent.press(registerButton);

    // Here you can add assertions to check if the handleRegister function is called
  });

  it('navigates back to login screen when "Already Have an account? Sign in" is pressed', () => {
    const { getByText } = render(
      <NavigationContainer>
        <RegisterScreen />
      </NavigationContainer>
    );

    const signInText = getByText('Already Have an account? Sign in');
    fireEvent.press(signInText);

    // Here you can add assertions to check if the navigation function is called to navigate back to the login screen
  });
});
