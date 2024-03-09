import React, {useEffect} from 'react';
import AppStack from './src/screens';
import {LoginProvider} from './src/context';
const App = () => {
  return (
    <LoginProvider>
      <AppStack />
    </LoginProvider>
  );
};

export default App;
