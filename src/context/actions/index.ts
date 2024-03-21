import axios, {AxiosError} from 'axios';
import {URL} from '../../utils';

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

export const GET_ROOMS = async (token?: string) => {
  try {
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

export const TOGGLE_SWITCH = async (
  token?: string,
  payload?: {slug: string; status: 'on' | 'off'},
) => {
  try {
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

    console.log('data', data.data);

    return data.data;
  } catch (error: any) {
    console.log('err', error.response?.data);
    return error.response?.data;
  }
};
