import {optionType} from '../../components/controls/Dropdown';

export type formType = {
  device_name: string;
  switch_number: string;
  device_type: optionType;
  device_image_path: any;
  status: 'on' | 'off';
  room_id: string;
};

export type deviceErrorType<T> = {
  device_name?: T;
  switch_number?: T;
  device_type?: T;
  device_image_path?: T;
  status?: T;
  room_id?: T;
};
