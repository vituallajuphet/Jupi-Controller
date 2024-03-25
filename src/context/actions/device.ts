import axios from 'axios';
import {URL, getImageBase64, getToken} from '../../utils';
import {optionType} from '../../components/controls/Dropdown';

type DeviceType = {
  device_name: string;
  switch_number: string;
  device_type: optionType;
  device_image_path?: any;
  status: 'off' | 'on';
  room_id: string;
};

type deleteDeviceType = {
  slugs?: string[];
  room_id?: number;
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

export const TOGGLE_SWITCH = async (payload?: {
  slug: string;
  status: 'on' | 'off';
}) => {
  try {
    const token = await getToken();
    const data = await axios.put(
      `${URL}device/switch`,
      {
        ...payload,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return data.data;
  } catch (error: any) {
    console.log('err', error.response?.data);
    return error.response?.data;
  }
};

export const DELETE_DEVICES = async (payload?: deleteDeviceType) => {
  try {
    const token = await getToken();
    const data = await axios.delete(`${URL}device`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      data: payload,
    });

    return data.data;
  } catch (error: any) {
    console.log('Errr', error.response);
    return error.response?.data;
  }
};
