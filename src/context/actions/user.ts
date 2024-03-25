import axios from 'axios';
import {URL, getToken} from '../../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  // setLoading(true);
  try {
    const data = await axios.post(`${URL}login`, {
      email,
      password,
    });
    await AsyncStorage.setItem('appToken', data?.data?.token);
    return data.data;
    // if (responseData?.token) {
    //   setAuth({
    //     token: responseData?.token,
    //     user: responseData.user,
    //   });
    //
    //   // setLoading(false);
    // }
  } catch (error: any) {
    throw error.response?.data;
    if (error.response?.data?.errors) {
      // console.log(
      //   'error.response?.data?.errors',
      //   error.response?.data?.errors,
      // );
      // setErrors(error?.response?.data?.errors);
      // setLoading(false);
    }
  }
};

export const LOGOUT = async () => {
  try {
    const token = await getToken();
    const data = await axios.post(
      `${URL}logout`,
      {},
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

export const GET_TOKEN = async () => {
  try {
    const token = await AsyncStorage.getItem('appToken');
    if (token) {
      const data = await axios.get(`${URL}connected`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data.data;
    }
  } catch (e: any) {
    throw e.response?.data;
  }
};
