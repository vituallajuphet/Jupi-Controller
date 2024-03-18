import React, { useEffect } from 'react';
import AppStack from './src/screens';
import { LoginProvider } from './src/context';
import { DataProvider } from './src/context/dataContext';
import { TailwindProvider } from 'tailwind-rn';
import { utilities } from './tailwind.json';
const App = () => {
  return (
    <LoginProvider>
      <DataProvider>
        <TailwindProvider utilities={utilities}>
          <AppStack />
        </TailwindProvider>
      </DataProvider>
    </LoginProvider>

  );
};

export default App;
