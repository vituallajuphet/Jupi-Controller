import axios from 'axios';
import {URL, getToken} from '../../utils';
import {Platform} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import {optionType} from '../../components/controls/Dropdown';

type addRoomType = {
  room_name: string;
  descriptions?: string;
  image?: any;
};

type DeviceType = {
  device_name: string;
  switch_number: string;
  device_type: optionType;
  device_image_path?: any;
  status: 'off' | 'on';
  room_id: string;
};

export const ADD_ROOM = async (payload?: addRoomType) => {
  try {
    const token = await getToken();

    const formdata = new FormData();

    formdata.append('room_name', payload?.room_name);
    formdata.append('descriptions', payload?.descriptions);
    if (payload?.image) {
      formdata.append('image', await getImageBase64(payload?.image));
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

export const ADD_DEVICE = async (payload?: DeviceType) => {
  try {
    const token = await getToken();

    const formdata = new FormData();

    formdata.append('device_name', payload?.device_name);
    formdata.append('switch_number', payload?.switch_number);
    formdata.append('status', payload?.status);
    formdata.append('device_type', payload?.device_type?.name || '');
    formdata.append('room_id', payload?.room_id);

    if (payload?.device_image_path) {
      formdata.append(
        'image',
        await getImageBase64(payload?.device_image_path),
      );
    }

    const data = await axios.post(`${URL}device`, formdata, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    });

    return data.data;
  } catch (error: any) {
    console.log('err', error.response?.data);
    throw error.response?.data;
  }
};

const getImageBase64 = async (image?: any) => {
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
