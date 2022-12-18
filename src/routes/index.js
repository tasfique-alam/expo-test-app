import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import FilterScreen from '../screens/FilterScreen'
import UserList from '../screens/UserList';

const Stack = createNativeStackNavigator();

const Routes = props => {

  return (

    <Stack.Navigator
      headerMode={'none'}
      initialRouteName={'filter'}
    >
      <Stack.Screen
        name="filter"
        component={FilterScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="UserList"
        component={UserList}
        options={{
          headerShown: false,
        }}
      />

    </Stack.Navigator>
  );
}

export default Routes;
