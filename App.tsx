import React, {useEffect} from 'react';
import AppStack from './src/screens';
import {LoginProvider} from './src/context';
import {DataProvider} from './src/context/dataContext';
import {TailwindProvider} from 'tailwind-rn';
import {utilities} from './tailwind.json';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StoreProvider} from './src/context/store';
import StoreView from './src/context/store/StoreView';

const App = () => {
  return (
    <DataProvider>
      <StoreProvider>
        <StoreView>
          <TailwindProvider utilities={utilities}>
            <AppStack />
          </TailwindProvider>
        </StoreView>
      </StoreProvider>
    </DataProvider>
  );
};

export default App;
