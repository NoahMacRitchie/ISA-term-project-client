import { createContext, useContext } from 'react';

const setAuthTokens = (data: string) => { };
export const AuthContext = createContext({'authTokens': '', setAuthTokens });

export function useAuth() {
  return useContext(AuthContext);
}