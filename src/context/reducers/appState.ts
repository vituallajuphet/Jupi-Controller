export const SET_LOADING = 'SET_LOADING';

export const appstate_reducer = (state: any, action: any) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};
