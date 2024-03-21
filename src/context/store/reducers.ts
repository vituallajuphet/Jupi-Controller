export const reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'SET_ROOMS':
      return {
        ...state,
        rooms: action.payload,
      };
    case 'ADD_ROOM':
      return {
        ...state,
        rooms: [...state.rooms, action.payload],
      };
    default:
      return state;
  }
};
