'use client'
import { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import Cookies from 'js-cookie';

const userContext = createContext<any>(null);

interface Client {
  name: string;
  email: string;
  password: string;
  tel: string;
}

interface MyContextProviderProps {
  children: ReactNode;
}

export const MyContextProvider = ({ children }: MyContextProviderProps) => {
  const [user, setUser] = useState<null | string | object>(null);

  useEffect(() => {
    const cookie = Cookies.get('yourCookieKey');
    if (cookie) {
      const parsedClient = JSON.parse(cookie) as Client;
      setUser(parsedClient);
    }
  },[]);
  
  
  return (
    <userContext.Provider value={{ user, setUser }}>
      {children}
    </userContext.Provider>
  );
};

export const useMyContext = () => useContext(userContext);