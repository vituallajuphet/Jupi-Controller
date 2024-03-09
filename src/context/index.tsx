import React, {createContext, useState} from 'react';

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
  logout: () => void;
  auth: authType;
}

export const LoginContext = createContext<LoginContextProps>({
  login: (e?: any) => {},
  logout: (e?: any) => {},
  auth: {
    token: undefined,
    user: undefined,
  },
});

export const LoginProvider: React.FC<any> = ({children}) => {
  const [auth, setAuth] = useState<authType>({
    token: undefined,
    user: undefined,
  });

  const login = (args?: any) => {
    const {email, password} = args;

    if (email === 'opet' && password === '1234') {
      setAuth({
        token: '1234',
        user: {
          name: 'John Doe',
          email: '',
        },
      });
    }
  };

  const logout = () => {
    setAuth({
      token: undefined,
      user: undefined,
    });
  };

  return (
    <LoginContext.Provider value={{auth, login, logout}}>
      {children}
    </LoginContext.Provider>
  );
};
