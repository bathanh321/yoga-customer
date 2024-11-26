import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Home from './(main)/home';
import Cart from './Cart';
import Classes from './Classes';

const Tab = createBottomTabNavigator();

const TabsLayout = () => {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Tab.Navigator initialRouteName="Home">
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Cart" component={Cart} />
        <Tab.Screen name="Class" component={Classes} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default TabsLayout