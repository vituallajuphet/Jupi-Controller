import React, {useContext, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {LoginScreen, RegisterScreen, SplashScreen} from './guest';
import {
  Settings,
  SmartHomeScreen,
  TrainScreen,
  Home,
  DevicesScreen,
  AddRoomScreen,
} from './auth';
import TrainHeader from '../components/controls/TrainHeader';
import {LoginContext} from '../context';
import TestScreen from './auth/TestScreen';
import RoomStacks from './RoomStacks/RoomStacks';

const Stack = createNativeStackNavigator();

const AppStack = () => {
  const context = useContext(LoginContext);

  const screens = () => {
    return context.auth.user ? (
      <>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="AddRoomScreen" component={AddRoomScreen} />
        <Stack.Screen
          options={{
            headerShown: true,
            header: args => {
              return <TrainHeader options={args} title="Train AI Machine" />;
            },
          }}
          name="TrainScreen"
          component={TrainScreen}
        />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="SmartHomeScreen" component={SmartHomeScreen} />
        <Stack.Screen name="TestScreen" component={TestScreen} />
        <Stack.Screen name="RoomStack" component={RoomStacks} />
      </>
    ) : (
      <>
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      </>
    );
  };

  return (
    <NavigationContainer>
      {
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          {screens()}
        </Stack.Navigator>
      }
    </NavigationContainer>
  );
};

export default AppStack;
