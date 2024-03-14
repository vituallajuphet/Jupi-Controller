import React, {useEffect} from 'react';
import AppStack from './src/screens';
import {LoginProvider} from './src/context';
import {DataProvider} from './src/context/dataContext';
const App = () => {
  return (
    <LoginProvider>
      <DataProvider>
        <AppStack />
      </DataProvider>
    </LoginProvider>
  );
};

export default App;
