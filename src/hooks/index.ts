import {useEffect, useMemo, useState} from 'react';
import {Keyboard, KeyboardEvent} from 'react-native';

const useKeyboardStatus = (): boolean => {
  const [isKeyboardShown, setIsKeyboardShown] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      handleKeyboardShow,
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      handleKeyboardHide,
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleKeyboardShow = (event: KeyboardEvent): void => {
    setIsKeyboardShown(true);
  };

  const handleKeyboardHide = (event: KeyboardEvent): void => {
    setIsKeyboardShown(false);
  };

  return isKeyboardShown;
};

export default useKeyboardStatus;

export const useDevicesCounts = (rooms?: any[]) => {
  const devices = useMemo(() => {
    if (!rooms?.length) {
      return 0;
    }
    return rooms.reduce(
      (acc, room) => {
        const active = room?.devices?.length
          ? room?.devices?.filter((device: any) => device.status === 'on')
              .length
          : 0;
        const inActive = room?.devices?.length
          ? room?.devices?.filter((device: any) => device.status === 'off')
              .length
          : 0;
        return {
          active: acc.active + active,
          inactive: acc.inactive + inActive,
        };
      },
      {
        active: 0,
        inactive: 0,
      },
    );
  }, [rooms]);

  return {active: devices.active, inactive: devices.inactive};
};
