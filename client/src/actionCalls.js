import api from './apiConfig';

export const loginCall = async (user, dispatch) => {
  dispatch({ type: 'LOGIN_START' });
  try {
    const response = await api.post('auth/login', user);
    console.log(response);
    dispatch({ type: 'LOGIN_SUCCESS', payload: response.data });
    return response.data;
  } catch (err) {
    console.log(err);
    dispatch({ type: 'LOGIN_ERROR', payload: err });
  }
};
