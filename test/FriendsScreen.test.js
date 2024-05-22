// __tests__/FriendsScreen.test.js
import React from "react";
import { render, waitFor, screen } from "@testing-library/react-native";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import FriendsScreen from "../FriendsScreen";
import { UserType } from "../UserContext";

// Mocking axios
const mock = new MockAdapter(axios);

const userId = "12345";
const mockFriendRequests = [
  {
    _id: "1",
    name: "Mansief Bhyan",
    email: "mansief@example.com",
    image: "https://example.com/mansief.jpg",
  },
  {
    _id: "2",
    name: "Tanvir ahmed",
    email: "tanvir@example.com",
    image: "https://example.com/tanvir.jpg",
  },
];

const renderWithContext = (component) => {
  return render(
    <UserType.Provider value={{ userId, setUserId: jest.fn() }}>
      {component}
    </UserType.Provider>
  );
};

describe("FriendsScreen", () => {
  beforeEach(() => {
    mock.reset();
  });

  it("renders friend requests correctly", async () => {
    // Mock the API response
    mock.onGet(`http://192.168.0.154:8000/friend-request/${userId}`).reply(200, mockFriendRequests);

    // Render the component
    renderWithContext(<FriendsScreen />);

    // Wait for the friend requests to be displayed
    await waitFor(() => {
      expect(screen.getByText("Your Friend Requests!")).toBeTruthy();
    });

    // Check if friend request items are rendered
    mockFriendRequests.forEach((request) => {
      expect(screen.getByText(request.name)).toBeTruthy();
    });
  });

  it("handles no friend requests", async () => {
    // Mock the API response with no data
    mock.onGet(`http://192.168.0.154:8000/friend-request/${userId}`).reply(200, []);

    // Render the component
    renderWithContext(<FriendsScreen />);

    // Ensure no friend requests text is rendered
    await waitFor(() => {
      expect(screen.queryByText("Your Friend Requests!")).toBeNull();
    });
  });

  it("handles API errors gracefully", async () => {
    // Mock the API to return an error
    mock.onGet(`http://192.168.0.154:8000/friend-request/${userId}`).reply(500);

    // Mock console log to avoid error message in test output
    jest.spyOn(console, 'log').mockImplementation(() => {});

    // Render the component
    renderWithContext(<FriendsScreen />);

    // Ensure no friend requests text is rendered
    await waitFor(() => {
      expect(screen.queryByText("Your Friend Requests!")).toBeNull();
    });
  });
});
