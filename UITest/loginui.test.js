import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import LoginScreen from './LoginScreen'; // Update the path as per your file structure

describe('LoginScreen', () => {
  it('renders correctly', () => {
    const { getByText, getByPlaceholderText } = render(<LoginScreen />);

    // Check if important text elements are rendered
    expect(getByText('Sign In')).toBeTruthy();
    expect(getByText('Sign In to Your Account')).toBeTruthy();

    // Check if email and password input fields are rendered
    expect(getByPlaceholderText('enter Your Email')).toBeTruthy();
    expect(getByPlaceholderText('Passowrd')).toBeTruthy();

    // Check if the Login button is rendered
    expect(getByText('Login')).toBeTruthy();

    // Check if the Sign Up button is rendered
    expect(getByText("Don't have an account? Sign Up")).toBeTruthy();
  });

  // You can add more specific tests here for user interactions, like testing the handleLogin function
});
