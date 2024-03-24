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

    case 'ADD_DEVICE':
      return {
        ...state,
        rooms: state.rooms.map(room =>
          room.slug === action.payload.room_slug
            ? {...room, devices: [...room.devices, action.payload]}
            : room,
        ),
      };
    default:
      return state;
  }
};
