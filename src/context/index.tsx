import axios, {AxiosError} from 'axios';
import React, {createContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const URL = 'http://localhost:8000/api/jupi/';

type authType = {
  token?: string;
  user?: {
    name: string;
    email: string;
    [key: string]: any;
  };
};

interface LoginContextProps extends authType {
  login: (e?: any) => void;
  logout: (e?: string) => void;
  register: (e?: any) => void;
  auth: authType;
  errors?: any;
}

export const LoginContext = createContext<LoginContextProps>({
  login: (e?: any) => {},
  logout: (e?: string) => {},
  register: (e?: any) => {},
  auth: {
    token: undefined,
    user: undefined,
  },
  errors: undefined,
});

export const LoginProvider: React.FC<any> = ({children}) => {
  const [auth, setAuth] = useState<authType>({
    token: undefined,
    user: undefined,
  });

  const [errors, setErrors] = useState<any>(undefined);

  useEffect(() => {
    getToken();
  }, []);

  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem('appToken');
      if (token) {
        const data = await axios.get(`${URL}connected`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAuth({
          token,
          user: data.data,
        });
      }
    } catch (e: any) {
      console.log('Eee', e.response.data);
    }
  };

  const login = async (args?: any) => {
    const {email, password} = args;

    try {
      const data = await axios.post(`${URL}login`, {
        email,
        password,
      });

      const {data: responseData} = data;
      if (responseData?.token) {
        setAuth({
          token: responseData?.token,
          user: responseData.user,
        });
        await AsyncStorage.setItem('appToken', responseData?.token);
      }
    } catch (error: any) {
      if (error.response?.data?.errors) {
        setErrors(error?.response?.data?.errors);
      }
    }
  };

  const register = (data?: any) => {
    setAuth({
      token: data.token,
      user: data.user,
    });
  };

  const logout = async (token: string) => {
    try {
      const data = await axios.post(
        `${URL}logout`,
        {
          token,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (data.data.status === 'success') {
        setAuth({
          token: undefined,
          user: undefined,
        });
        await AsyncStorage.removeItem('appToken');
      }
    } catch (error) {}
  };

  return (
    <LoginContext.Provider value={{auth, login, logout, register, errors}}>
      {children}
    </LoginContext.Provider>
  );
};
