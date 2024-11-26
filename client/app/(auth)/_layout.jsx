import { View, Text } from 'react-native'
import React from 'react'

const AuthLayout = () => {
  return (
    <>
      <StatusBar style="auto" />
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={require('./login').default} />
        <Stack.Screen name="Signup" component={require('./signup').default} />
      </Stack.Navigator>
    </>
  )
}

export default AuthLayout