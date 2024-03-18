import axios, { AxiosError } from 'axios';
import React, { createContext, useState } from 'react';

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
  auth: authType;
  errors?: any;
}


export const LoginContext = createContext<LoginContextProps>({
  login: (e?: any) => { },
  logout: (e?: string) => { },
  auth: {
    token: undefined,
    user: undefined,
  },
  errors: undefined
});

export const LoginProvider: React.FC<any> = ({ children }) => {
  const [auth, setAuth] = useState<authType>({
    token: undefined,
    user: undefined,
  });

  const [errors, setErrors] = useState<any>(undefined)

  const login = async (args?: any) => {
    const { email, password } = args;

    try {
      const data = await axios.post(`${URL}login`, {
        email,
        password
      })


      const { data: responseData } = data
      if (responseData?.token) {
        setAuth({
          token: responseData?.token,
          user: responseData.user,
        });
      }

    } catch (error: any) {
      if (error.response?.data?.errors) {
        setErrors(error?.response?.data?.errors)
      }
    }
  };

  const logout = async (token: string) => {

    console.log("tokentoken", token)

    try {
      const data = await axios.post(`${URL}logout`, {
        token
      })
      if (data.data.status === 'success') {
        setAuth({
          token: undefined,
          user: undefined,
        });
      }
    } catch (error) {

    }
  }

  return (
    <LoginContext.Provider value={{ auth, login, logout, errors }}>
      {children}
    </LoginContext.Provider>
  );
};
