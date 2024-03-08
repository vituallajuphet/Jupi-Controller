import React, {useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {Controller, Home, SplashScreen} from './guest';
import {TrainScreen} from './auth';
import {Text, View} from '../components/controls';
import TrainHeader from '../components/controls/TrainHeader';

const Stack = createNativeStackNavigator();

const AppStack = () => {
  const [started, setStarted] = useState(false);
  //   const [loggedIn, setLoggedIn] = useState(false);

  setTimeout(() => {
    setStarted(true);
  }, 3000);

  const screens = () => {
    return started ? (
      <>
        <Stack.Screen name="Home" component={Home} />
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
        <Stack.Screen name="Controller" component={Controller} />
      </>
    ) : (
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
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
