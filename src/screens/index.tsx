import React, {useContext, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {Home, LoginScreen, RegisterScreen, SplashScreen} from './guest';
import {Settings, SmartHomeScreen, TrainScreen} from './auth';
import TrainHeader from '../components/controls/TrainHeader';
import {LoginContext} from '../context';
import TestScreen from './auth/TestScreen';

const Stack = createNativeStackNavigator();

const AppStack = () => {
  const [started, setStarted] = useState(false);

  const context = useContext(LoginContext);

  setTimeout(() => {
    setStarted(true);
  }, 3000);

  const screens = () => {
    return started ? (
      <>
        {context.auth.user ? (
          <>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen
              options={{
                headerShown: true,
                header: args => {
                  return (
                    <TrainHeader options={args} title="Train AI Machine" />
                  );
                },
              }}
              name="TrainScreen"
              component={TrainScreen}
            />
            <Stack.Screen name="Settings" component={Settings} />
            <Stack.Screen name="SmartHomeScreen" component={SmartHomeScreen} />
            <Stack.Screen name="TestScreen" component={TestScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          </>
        )}
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
