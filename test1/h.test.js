import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import HomeScreen from '../screens/HomeScreen';
import { UserType } from '../UserContext';

// Mocking the navigation functions
const mockNavigation = {
  navigate: jest.fn(),
  setOptions: jest.fn(),
  replace: jest.fn(),
};

// Mocking the UserContext
const mockUserContextValue = {
  userId: 'mockUserId',
  setUserId: jest.fn(),
};

// Mocking the axios module
jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve({ data: [{ id: 1, name: 'User 1' }] })),
}));

describe('HomeScreen component', () => {
  test('renders correctly', async () => {
    const { getByText } = render(
      <UserType.Provider value={mockUserContextValue}>
        <HomeScreen navigation={mockNavigation} />
      </UserType.Provider>
    );

    // Check if the header title is rendered
    expect(getByText('Swift Chat')).toBeDefined();

    // Wait for the data to be fetched
    await Promise.resolve();

    // Check if the user item is rendered
    expect(getByText('User 1')).toBeDefined();
  });

  test('logout button triggers handleLogout', async () => {
    const { getByText } = render(
      <UserType.Provider value={mockUserContextValue}>
        <HomeScreen navigation={mockNavigation} />
      </UserType.Provider>
    );

    // Wait for the data to be fetched
    await Promise.resolve();

    // Find and press the logout button
    fireEvent.press(getByText('Logout'));

    // Check if handleLogout is called
    expect(mockNavigation.replace).toHaveBeenCalledWith('Login');
  });
});
