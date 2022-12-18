import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Welcome from '../screens/Welcome'

const Stack = createNativeStackNavigator();

const Routes = props => {

  return (

    <Stack.Navigator
      headerMode={'none'}
      initialRouteName={'welcome'}
    >
      <Stack.Screen
        name="welcome"
        component={Welcome}
        options={{
          headerShown: false,
        }}
      />

    </Stack.Navigator>
  );
}

export default Routes;
