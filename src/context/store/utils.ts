export const combineReducers =
  (reducers: any) =>
  (state = {} as any, action: any) => {
    const newState: any = {};
    for (let key in reducers) {
      newState[key] = reducers[key](state[key], action);
    }
    return newState;
  };
