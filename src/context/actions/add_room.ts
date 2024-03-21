import axios from 'axios';
import {URL, getToken} from '../../utils';

type addRoomType = {
  room_name: string;
  descriptions?: string;
};

export const ADD_ROOM = async (payload?: addRoomType) => {
  try {
    const token = await getToken();
    const data = await axios.post(
      `${URL}rooms`,
      {
        ...payload,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return data.data;
  } catch (error: any) {
    console.log('err', error.response?.data);
    return error.response?.data;
  }
};
