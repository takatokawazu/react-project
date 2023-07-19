import { createContext, useEffect, useReducer } from 'react';
import AuthReducer from './AuthReducer';

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  isFetcing: false,
  error: false,
};

export const AuthContext = createContext(initialState);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);
  console.log(state);
  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(state.user));
  }, [state.user]);
  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetcing: state.isFetcing,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
