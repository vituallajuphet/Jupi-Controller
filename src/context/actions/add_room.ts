import axios from 'axios';
import {URL, getToken} from '../../utils';
import {Platform} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';

type addRoomType = {
  room_name: string;
  descriptions?: string;
  image?: any;
};

export const ADD_ROOM = async (payload?: addRoomType) => {
  try {
    const token = await getToken();

    const formdata = new FormData();

    formdata.append('room_name', payload?.room_name);
    formdata.append('descriptions', payload?.descriptions);
    if (payload?.image) {
      const uri =
        Platform.OS === 'android'
          ? payload?.image.path
          : payload?.image.path.replace('file://', '');
      const filename = payload?.image.path.split('/').pop();
      const match = /\.(\w+)$/.exec(filename as string);
      const ext = match?.[1];
      const type = match ? `image/${match[1]}` : `image`;

      const imageResponse = await RNFetchBlob.fs.readFile(uri, 'base64');
      const imageData = `data:${type};base64,${imageResponse}`;
      formdata.append('image', imageData);
    }

    const data = await axios.post(`${URL}rooms`, formdata, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    });

    return data.data;
  } catch (error: any) {
    console.log('err', error.response?.data);
    return error.response?.data;
  }
};
