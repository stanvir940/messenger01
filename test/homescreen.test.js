describe('HomeScreen', () => {
    test('renders correctly', () => {
      const { getByText } = render(<HomeScreen />);
      expect(getByText('Swift Chat')).toBeDefined();
    });
  
    test('logs out when logout button is pressed', async () => {
      // Mock AsyncStorage
      AsyncStorage.getItem.mockResolvedValueOnce('mockAuthToken');
      AsyncStorage.removeItem.mockResolvedValueOnce();
      
      // Mock axios
      axios.get.mockResolvedValueOnce({ data: [{ id: 1, name: 'User 1' }] });
  
      const { getByText } = render(<HomeScreen />);
      const logoutButton = getByText('Logout');
  
      fireEvent.press(logoutButton);
  
      // You might want to assert navigation behavior here
      // For example, check if navigation.replace('Login') is called
    });
  });
  