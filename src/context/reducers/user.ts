export const LOGIN = 'LOGIN';
export const REGISTER = 'REGISTER';
export const LOGOUT = 'LOGOUT';
export const UPDATE_PROFILE = 'UPDATE_PROFILE';

export const user_reducer = (state: any, action: any) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        auth: action.payload,
      };
    case REGISTER:
      return {
        ...state,
        auth: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        auth: undefined,
      };
    case UPDATE_PROFILE:
      return {
        ...state,
        auth: action.payload,
      };
    default:
      return state;
  }
};
