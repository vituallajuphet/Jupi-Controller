import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AddDevices} from '.';
import {DevicesScreen} from '../auth';

const RoomStacks = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="DevicesScreen"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="DevicesScreen" component={DevicesScreen} />
      <Stack.Screen name="AddDevices" component={AddDevices} />
    </Stack.Navigator>
  );
};

export default RoomStacks;
