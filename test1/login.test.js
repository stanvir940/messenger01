import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import LoginScreen from './LoginScreen';

describe('<LoginScreen />', () => {
  test('handles login correctly', async () => {
    const { getByPlaceholderText, getByText } = render(<LoginScreen />);
    
    // Simulate user input
    const emailInput = getByPlaceholderText('enter Your Email');
    const passwordInput = getByPlaceholderText('Passowrd');
    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'password123');
    
    // Simulate login button press
    const loginButton = getByText('Login');
    fireEvent.press(loginButton);
    
    // Wait for asynchronous tasks to complete
    await waitFor(() => {
      // Check if handleLogin function is called
      expect(mockHandleLogin).toHaveBeenCalled();
      
      // Additional assertions can be added here based on the expected behavior after login
    });
  });
});
