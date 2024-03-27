import axios from 'axios';
import {URL, getImageBase64, getToken} from '../../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type UpdateProfileType = {
  name?: string;
  email?: string;
  age?: string;
  gender?: string;
  contact?: string;
  meta?: string;
};
type userRegisterType = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

type LoginType = {
  email: string;
  password: string;
};

export const headerSettings = (token?: string | null) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  };
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
    throw error.response?.data;
  }
};

export const LOGIN = async (payload: LoginType) => {
  const {email, password} = payload;
  try {
    const data = await axios.post(`${URL}login`, {
      email,
      password,
    });
    await AsyncStorage.setItem('appToken', data?.data?.token);
    return data.data;
  } catch (error: any) {
    throw error.response?.data;
  }
};

export const LOGOUT = async () => {
  try {
    const token = await getToken();
    const data = await axios.post(`${URL}logout`, {}, headerSettings(token));
    return data.data;
  } catch (error: any) {
    throw error.response?.data;
  }
};

export const UPDATE_PROFILE_INFO = async (payload: UpdateProfileType) => {
  const {name, email, ...rest} = payload;

  const meta = JSON.stringify(rest);

  try {
    const token = await getToken();
    const data = await axios.put(
      `${URL}profile`,
      {name, email, meta},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return data.data;
  } catch (error: any) {
    throw error.response?.data;
  }
};

export const UPDATE_PROFILE = async (payload: {image: undefined}) => {
  try {
    const token = await getToken();

    const formdata = new FormData();

    if (payload?.image) {
      formdata.append('image', await getImageBase64(payload?.image));
    }

    const data = await axios.post(
      `${URL}profile-picture/`,
      formdata,
      headerSettings(token),
    );

    return data.data;
  } catch (error: any) {
    throw error.response?.data;
  }
};

export const GET_TOKEN = async () => {
  try {
    const token = await AsyncStorage.getItem('appToken');
    if (token) {
      const data = await axios.get(`${URL}connected`, headerSettings(token));
      return data.data;
    }
  } catch (e: any) {
    throw e.response?.data;
  }
};
