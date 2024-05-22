import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import RegisterScreen from '../screens/RegisterScreen';
import axios from 'axios';

// Mock axios.post
jest.mock('axios');

describe('RegisterScreen', () => {
  it('renders correctly', () => {
    const { getByPlaceholderText, getByTestId } = render(<RegisterScreen />);

    // Assert that the RegisterScreen renders correctly
    expect(getByTestId('register-screen')).toBeDefined();

    // Assert that input fields are rendered
    expect(getByPlaceholderText('Enter your name')).toBeDefined();
    expect(getByPlaceholderText('Enter your email')).toBeDefined();
    expect(getByPlaceholderText('Enter your password')).toBeDefined();
    expect(getByPlaceholderText('Enter your image URL')).toBeDefined();

    // Assert that the Register button is rendered
    expect(getByTestId('register-button')).toBeDefined();
  });

  it('registers a user when Register button is pressed', async () => {
    const { getByPlaceholderText, getByTestId } = render(<RegisterScreen />);

    // Mock user input
    const nameInput = getByPlaceholderText('Enter your name');
    const emailInput = getByPlaceholderText('Enter your email');
    const passwordInput = getByPlaceholderText('Enter your password');
    const imageInput = getByPlaceholderText('Enter your image URL');

    fireEvent.changeText(nameInput, 'Test User');
    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'password123');
    fireEvent.changeText(imageInput, 'https://example.com/image.jpg');

    // Mock the successful response from axios.post
    axios.post.mockResolvedValueOnce({
      data: {
        message: 'User registered successfully',
      },
    });

    // Press the Register button
    fireEvent.press(getByTestId('register-button'));

    // Wait for the registration process to complete
    await waitFor(() => {
      // Assert that the axios.post function is called with the correct parameters
      expect(axios.post).toHaveBeenCalledWith('http://192.168.0.154:8000/register', {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        image: 'https://example.com/image.jpg',
      });

      // Assert that the success message is displayed
      expect(getByTestId('success-message')).toBeDefined();
    });
  });
});
