import api from './index'

export const signup = async (userInfo) => {
    try {
      const response = await api.post('/signup', userInfo);
      return response.data;
    } catch (error) {
      console.error('Signup failed:', error);
      throw error;
    }
};

export const login = async (userInfo) => {
  try {
    const response = await api.post('/login', userInfo);
    console.log("api"+response.data.token);
    return await response.data;
  } catch (error) {
    console.error('login failed:', error);
    throw error;
  }
};

export const verifyUser = async (token) => {
  try{
    const response = await api.post('/',{"token":token});
    return await response.data;
  }catch (error) {
    console.log('user verificarion failed',error);
  }
}