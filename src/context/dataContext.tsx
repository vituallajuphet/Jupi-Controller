import React, { createContext, useState } from 'react';

const data = [
  {
    id: 1,
    name: 'Switch 1',
  },
  {
    id: 2,
    name: 'Switch 2',
  },
  {
    id: 3,
    name: 'Switch 3',
  },
  {
    id: 4,
    name: 'Switch 4',
  },
];

type dataType = {
  server?: string;
  switches?: Array<any>;
};

interface dataContext extends dataType {
  settings: dataType;
}

export const DataContext = createContext<dataContext>({
  settings: {
    server: '',
    switches: data,
  },
});

export const DataProvider: React.FC<any> = ({ children }) => {
  const [settings, setSettings] = useState<dataType>({
    server: 'http://192.168.1.199/',
    switches: data,
  });

  return (
    <DataContext.Provider value={{ settings, setSettings }}>
      {children}
    </DataContext.Provider>
  );
};
