import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './app/(auth)/login';
import SignUp from './app/(auth)/signup';
import Home from './app/(tabs)/Home';
import Cart from './app/(tabs)/Cart';
import Classes from './app/(tabs)/Classes';
import ClassInfo from './app/(tabs)/ClassInfo';
import MyClasses from './app/(tabs)/MyClasses';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={SignUp} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Cart" component={Cart} />
        <Stack.Screen name="Classes" component={Classes} />
        <Stack.Screen name="ClassInfo" component={ClassInfo} />
        <Stack.Screen name="MyClasses" component={MyClasses} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

