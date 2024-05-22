import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import ChatMessagesScreen from '../screens/ChatMessagesScreen';
import { UserType } from '../UserContext';

jest.mock('expo-image-picker', () => ({
  launchImageLibraryAsync: jest.fn(() => Promise.resolve({ cancelled: false, uri: 'selected-image-uri' })),
}));

describe('ChatMessagesScreen component', () => {
  it('renders messages correctly', () => {
    // Mock the UserType context value
    const userTypeValue = {
      userId: 'testUserId',
      setUserId: jest.fn(),
    };

    // Render the ChatMessagesScreen component with the UserType context value
    const { getByText, getByPlaceholderText } = render(
      <UserType.Provider value={userTypeValue}>
        <ChatMessagesScreen />
      </UserType.Provider>
    );

    // You can add assertions to check if specific messages are rendered correctly
    expect(getByText('Your message')).toBeDefined();
    // Add more assertions as needed
  });

  it('sends a message', async () => {
    // Mock the UserType context value
    const userTypeValue = {
      userId: 'testUserId',
      setUserId: jest.fn(),
    };

    // Render the ChatMessagesScreen component with the UserType context value
    const { getByPlaceholderText, getByText } = render(
      <UserType.Provider value={userTypeValue}>
        <ChatMessagesScreen />
      </UserType.Provider>
    );

    // Simulate typing a message
    fireEvent.changeText(getByPlaceholderText('Type Your message...'), 'Test message');

    // Simulate pressing the send button
    fireEvent.press(getByText('Send'));

    // Wait for the message to be sent
    await waitFor(() => {
      // You can add assertions to verify if the message is sent successfully
    });
  });

  it('deletes selected messages', async () => {
    // Mock the UserType context value
    const userTypeValue = {
      userId: 'testUserId',
      setUserId: jest.fn(),
    };

    // Render the ChatMessagesScreen component with the UserType context value
    const { getByTestId, getByText } = render(
      <UserType.Provider value={userTypeValue}>
        <ChatMessagesScreen />
      </UserType.Provider>
    );

    // Select a message
    fireEvent.press(getByTestId('select-message'));

    // Simulate pressing the delete button
    fireEvent.press(getByText('Delete'));

    // Wait for the message to be deleted
    await waitFor(() => {
      // You can add assertions to verify if the message is deleted successfully
    });
  });

  it('toggles the emoji selector', () => {
    // Mock the UserType context value
    const userTypeValue = {
      userId: 'testUserId',
      setUserId: jest.fn(),
    };

    // Render the ChatMessagesScreen component with the UserType context value
    const { getByTestId } = render(
      <UserType.Provider value={userTypeValue}>
        <ChatMessagesScreen />
      </UserType.Provider>
    );

    // Simulate pressing the emoji button
    fireEvent.press(getByTestId('emoji-button'));

    // You can add assertions to verify if the emoji selector is displayed
  });
});
