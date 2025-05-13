import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './screen/HomeScreen';
import ScanScreen from './screen/ScanScreen';
import Cart from './screen/Cart';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
        }}
        tabBar={() => null}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen 
          name="ScanScreen" 
          component={ScanScreen}
          options ={{
            tabBarStyle: {display: 'none'}
          }} />
        <Tab.Screen name="Cart" component={Cart} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
