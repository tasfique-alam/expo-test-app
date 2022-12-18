import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Welcome from '../screens/Welcome'
import Dashboard from '../screens/Dashboard';

const Stack = createNativeStackNavigator();

const Routes = props => {

  return (

    <Stack.Navigator
      headerMode={'none'}
      initialRouteName={'dashboard'}
    >
      <Stack.Screen
        name="welcome"
        component={Welcome}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="dashboard"
        component={Dashboard}
        options={{
          headerShown: false,
        }}
      />

    </Stack.Navigator>
  );
}

export default Routes;
