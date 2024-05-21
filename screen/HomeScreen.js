import React, { useContext, useEffect, useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import axios from "axios";
import User from "../components/User";
import { UserType } from "../UserContext";

const HomeScreen = () => {
  const navigation = useNavigation();
  const { userId, setUserId } = useContext(UserType);
  const [users, setUsers] = useState([]);
  const [hasFetchedUsers, setHasFetchedUsers] = useState(false);

  // Function to handle logout
  const handleLogout = async () => {
    try {
      // Remove the authToken from AsyncStorage
      await AsyncStorage.removeItem("authToken");
      // Reset userId state
      setUserId(null);
      // Navigate to the login screen
      navigation.replace("Login");
    } catch (error) {
      console.log("Error logging out:", error);
    }
  };

  useEffect(() => {
    // Set header options
    navigation.setOptions({
      headerTitle: "",
      headerLeft: () => (
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>Swift Chat</Text>
      ),
      headerRight: () => (
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <Ionicons
            onPress={() => navigation.navigate("Chats")}
            name="chatbox-ellipses-outline"
            size={24}
            color="black"
          />
          <MaterialIcons
            onPress={() => navigation.navigate("Friends")}
            name="people-outline"
            size={24}
            color="black"
          />
          {/* Logout button */}
          <Pressable onPress={handleLogout}>
            <Text style={{ fontWeight: "bold", color: "red" }}>Logout</Text>
          </Pressable>
        </View>
      ),
    });

    // Fetch users only once on component mount using Proxy
    if (!hasFetchedUsers) {
      fetchUsersProxy();
    }
  }, [hasFetchedUsers]);

  // Proxy function to fetch users
  const fetchUsersProxy = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.userId;
      setUserId(userId);

      const response = await axios.get(
        `http://192.168.0.154:8000/users/${userId}`
      );
      setUsers(response.data);
      setHasFetchedUsers(true); // Update the state to indicate that users have been fetched
    } catch (error) {
      console.log("error retrieving users", error);
    }
  };

  return (
    <View>
      <View style={{ padding: 10 }}>
        {users.map((item, index) => (
          <User key={index} item={item} />
        ))}
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
