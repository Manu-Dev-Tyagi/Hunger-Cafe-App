import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import MenuScreen from '../screens/MenuScreen';
import OrderScreen from '../screens/OrderScreen'; // Assuming OrderScreen is the correct screen
import PaymentScreen from '../screens/PaymentScreen';

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'Home', headerStyle: { backgroundColor: '#f5fcff' } }}
      />
      <Stack.Screen
        name="Menu"
        component={MenuScreen}
        options={{ title: 'Menu', headerStyle: { backgroundColor: '#f5fcff' } }}
      />
      <Stack.Screen
        name="OrderSummary"
        component={OrderScreen} // Ensure OrderSummary component is imported and defined
        options={{ title: 'Order Summary', headerStyle: { backgroundColor: '#f5fcff' } }}
      />
      <Stack.Screen
        name="Payment"
        component={PaymentScreen}
        options={{ title: 'Payment', headerStyle: { backgroundColor: '#f5fcff' } }}
      />
    </Stack.Navigator>
  );
}

export default AppNavigator;
