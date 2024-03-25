export const ADD_ROOM = 'ADD_ROOM';
export const SET_ROOMS = 'SET_ROOMS';
export const ADD_DEVICE = 'ADD_DEVICE';
export const SET_DEVICES = 'SET_DEVICES';

export const room_reducer = (state: any, action: any) => {
  switch (action.type) {
    case SET_ROOMS:
      return {
        ...state,
        rooms: action.payload,
      };
    case ADD_ROOM:
      return {
        ...state,
        rooms: [...state.rooms, action.payload],
      };
    case ADD_DEVICE:
      return {
        ...state,
        rooms: state.rooms.map(room =>
          room.slug === action.payload.room_slug
            ? {...room, devices: [...room?.devices, action.payload]}
            : room,
        ),
      };
    case SET_DEVICES:
      return {
        ...state,
        rooms: state.rooms.map(room =>
          room.slug === action.payload.room_slug
            ? {...room, devices: [...action.payload.devices]}
            : room,
        ),
      };

    default:
      return state;
  }
};
