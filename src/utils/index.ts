import AsyncStorage from '@react-native-async-storage/async-storage';

export {st} from './styles';

export const URL = 'http://localhost:8000/api/jupi/';

export const getToken = async () => {
  const token = await AsyncStorage.getItem('appToken');
  return token;
};
