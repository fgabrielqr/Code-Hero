import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Details from './pages/details';
import Home from './pages/home';
const Stack = createNativeStackNavigator();

export default function Routes() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: '#e61919'},
        headerTintColor: 'white',
      }}>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Details"
        component={Details}
        options={{title: 'Descrição'}}
        //options={({route}) => ({characters: route.params.comic})}
      />
    </Stack.Navigator>
  );
}
