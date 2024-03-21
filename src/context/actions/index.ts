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

    return data.data;
  } catch (error: any) {
    return error.response?.data;
  }
};
