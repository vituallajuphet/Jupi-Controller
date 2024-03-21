import React, {createContext, useReducer, useState} from 'react';
import {reducer} from './reducers';

type stateType = {
  rooms?: Array<any>;
};

interface dataContext {
  state?: stateType;
  dispatch?: any;
}

export const StoreContext = createContext<dataContext>({});

export const initialState = {
  rooms: [],
};

export const StoreProvider: React.FC<any> = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StoreContext.Provider value={{state, dispatch}}>
      {children}
    </StoreContext.Provider>
  );
};
