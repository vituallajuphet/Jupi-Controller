import axios, {AxiosError} from 'axios';
import {URL, getToken} from '../../utils';
export {ADD_ROOM, ADD_DEVICE} from './add_room';

type userRegisterType = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export const REGISTER_USER = async ({
  email,
  name,
  password,
  password_confirmation,
}: userRegisterType) => {
  try {
    const data = await axios.post(`${URL}register`, {
      email,
      name,
      password,
      password_confirmation,
    });

    return data.data;
  } catch (error: any) {
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

export const TOGGLE_SWITCH = async (payload?: {
  slug: string;
  status: 'on' | 'off';
}) => {
  try {
    const token = await getToken();
    const data = await axios.put(
      `${URL}device/switch`,
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
