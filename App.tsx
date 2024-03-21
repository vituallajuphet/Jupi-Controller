import React, {useEffect} from 'react';
import AppStack from './src/screens';
import {LoginProvider} from './src/context';
import {DataProvider} from './src/context/dataContext';
import {TailwindProvider} from 'tailwind-rn';
import {utilities} from './tailwind.json';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StoreProvider} from './src/context/store';

const App = () => {
  return (
    <LoginProvider>
      <DataProvider>
        <StoreProvider>
          <TailwindProvider utilities={utilities}>
            <AppStack />
          </TailwindProvider>
        </StoreProvider>
      </DataProvider>
    </LoginProvider>
  );
};

export default App;
