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
    return response.data;
  } catch (error) {
    console.error('login failed:', error);
    throw error;
  }
};

export const verifyUser = async () => {
  try{
    const response = await api.post('/',{});
    return response.data;
  }catch (error) {
    console.log('user verificarion failed',error);
  }
}