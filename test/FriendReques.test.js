import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import FriendRequest from "../components/FriendRequest"; // Adjust the path as necessary
import { UserType } from "../UserContext";
import { NavigationContainer } from "@react-navigation/native";

const mockNavigation = {
  navigate: jest.fn(),
};

jest.mock("@react-navigation/native", () => ({
  useNavigation: () => mockNavigation,
}));

describe("FriendRequest Component", () => {
  const mockItem = {
    _id: "1",
    name: "John Doe",
    image: "https://example.com/image.jpg",
  };

  const mockSetFriendRequests = jest.fn();

  it("should call acceptRequest and navigate to Chats on button press", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      })
    );

    const { getByText } = render(
      <UserType.Provider value={{ userId: "2", setUserId: jest.fn() }}>
        <NavigationContainer>
          <FriendRequest
            item={mockItem}
            friendRequests={[mockItem]}
            setFriendRequests={mockSetFriendRequests}
          />
        </NavigationContainer>
      </UserType.Provider>
    );

    const acceptButton = getByText("Accept");
    fireEvent.press(acceptButton);

    expect(global.fetch).toHaveBeenCalledWith(
      "http://192.168.0.154:8000/friend-request/accept",
      expect.objectContaining({
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          senderId: mockItem._id,
          recepientId: "2",
        }),
      })
    );

    await Promise.resolve(); // wait for promises to resolve

    expect(mockSetFriendRequests).toHaveBeenCalledWith([]);
    expect(mockNavigation.navigate).toHaveBeenCalledWith("Chats");
  });
});
