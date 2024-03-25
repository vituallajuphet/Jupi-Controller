import axios from 'axios';
import {URL, getImageBase64, getToken} from '../../utils';

type addRoomType = {
  room_name: string;
  descriptions?: string;
  image?: any;
};

export const ADD_ROOM = async (payload?: addRoomType) => {
  try {
    const token = await getToken();

    const formdata = new FormData();

    formdata.append('room_name', payload?.room_name);
    formdata.append('descriptions', payload?.descriptions);
    if (payload?.image) {
      formdata.append('image', await getImageBase64(payload?.image));
    }
    const data = await axios.post(`${URL}rooms`, formdata, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    });

    return data.data;
  } catch (error: any) {
    console.log('err', error.response?.data);
    return error.response?.data;
  }
};

export const GET_ROOMS = async () => {
  try {
    const token = await getToken();
    const data = await axios.get(`${URL}rooms`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data.data?.rooms;
  } catch (error: any) {
    return error.response?.data;
  }
};
