import {useEffect, useState} from 'react';
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
