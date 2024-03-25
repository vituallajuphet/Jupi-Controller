import React, {createContext, useReducer} from 'react';
import {combineReducers} from './utils';
import {room_reducer, user_reducer} from '../reducers';
import {StateTypes} from '../types';

interface dataContext {
  state?: StateTypes;
  dispatch?: any;
}

export const StoreContext = createContext<dataContext>({});

export const initialState = {
  room: [],
  device: [],
  user: undefined,
};

export const StoreProvider: React.FC<any> = ({children}) => {
  const [state, dispatch] = useReducer(
    combineReducers({
      room: room_reducer,
      user: user_reducer,
    }),
    initialState,
  );

  return (
    <StoreContext.Provider value={{state, dispatch}}>
      {children}
    </StoreContext.Provider>
  );
};
