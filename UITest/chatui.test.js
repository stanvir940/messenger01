import React from 'react';
import { render } from '@testing-library/react-native';
import ChatsScreen from '../screens/ChatsScreen';
import { UserType } from '../UserContext';

// Mock the UserType context
jest.mock('../UserContext', () => ({
  UserType: {
    userId: 'mockUserId', // Provide a mock userId
    setUserId: jest.fn(), // Mock the setUserId function
  },
}));

describe('ChatsScreen', () => {
  it('renders correctly', () => {
    const { getByTestId } = render(<ChatsScreen />);

    // Assert that the ChatsScreen renders correctly
    expect(getByTestId('chats-screen')).toBeDefined();
  });

  // Add more tests as needed
});
