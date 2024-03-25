export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const UPDATE_PROFILE = 'UPDATE_PROFILE';

export const user_reducer = (state: any, action: any) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        user: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        user: undefined,
      };
    case UPDATE_PROFILE:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};
