import AsyncStorage from '@react-native-async-storage/async-storage';
import {Platform} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';

export {st} from './styles';

export const URL = 'http://localhost:8000/api/jupi/';
export const BASE_URL = 'http://localhost:8000/';

export const getToken = async () => {
  const token = await AsyncStorage.getItem('appToken');
  return token;
};

export const getImageBase64 = async (image?: any) => {
  const uri =
    Platform.OS === 'android' ? image.path : image.path.replace('file://', '');
  const filename = image.path.split('/').pop();
  const match = /\.(\w+)$/.exec(filename as string);
  const ext = match?.[1];
  const type = match ? `image/${match[1]}` : `image`;

  const imageResponse = await RNFetchBlob.fs.readFile(uri, 'base64');
  const imageData = `data:${type};base64,${imageResponse}`;
  return imageData;
};
