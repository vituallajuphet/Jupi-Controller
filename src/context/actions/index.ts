import axios, {AxiosError} from 'axios';
const URL = 'http://localhost:8000/api/jupi/';

type userRegisterType = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export const REGISTER_USER = async ({
  email,
  name,
  password,
  password_confirmation,
}: userRegisterType) => {
  try {
    const data = await axios.post(`${URL}register`, {
      email,
      name,
      password,
      password_confirmation,
    });

    return data.data;
  } catch (error: any) {
    return error.response?.data;
  }
};
