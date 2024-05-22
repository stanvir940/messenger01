import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import HomeScreen from '../screens/HomeScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// Import the NavigationContainer
import { NavigationContainer } from '@react-navigation/native';

// Mock AsyncStorage methods
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  removeItem: jest.fn(),
}));

// Mock axios get method
jest.mock('axios');

// Mock the useNavigation hook
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    replace: jest.fn(),
  }),
}));

describe('HomeScreen', () => {
  test('renders users list', async () => {
    // Mock AsyncStorage getItem to return a token
    AsyncStorage.getItem.mockResolvedValueOnce('mock-auth-token');

    // Mock axios get method to return data
    axios.get.mockResolvedValueOnce({
      data: [{ id: 1, name: 'User 1' }, { id: 2, name: 'User 2' }],
    });

    // Render the HomeScreen component inside NavigationContainer
    const { getByText } = render(
      <NavigationContainer>
        <HomeScreen />
      </NavigationContainer>
    );

    // Wait for the data to be loaded
    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(
        'http://192.168.0.154:8000/users/mock-user-id'
      );
    });

    // Check if users are rendered
    expect(getByText('User 1')).toBeDefined();
    expect(getByText('User 2')).toBeDefined();

    // Check if the logout button is rendered
    const logoutButton = getByText('Logout');
    expect(logoutButton).toBeDefined();

    // Simulate pressing the logout button
    fireEvent.press(logoutButton);

    // Wait for AsyncStorage.removeItem to be called
    await waitFor(() => {
      expect(AsyncStorage.removeItem).toHaveBeenCalledWith('authToken');
    });

    // Check if navigation to the login screen is triggered
    expect(useNavigation().replace).toHaveBeenCalledWith('Login');
  });
});
