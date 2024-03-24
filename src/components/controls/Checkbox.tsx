import {FC} from 'react';
import {ViewStyle} from 'react-native';
import {Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

interface CheckboxProps {
  value: boolean;
  onValueChange?: () => void;
  style?: ViewStyle;
}

const Checkbox: FC<CheckboxProps> = ({
  value,
  onValueChange,
  style,
}: CheckboxProps) => {
  return (
    <Pressable
      style={style}
      onPress={() => {
        if (onValueChange) {
          onValueChange();
        }
      }}>
      <Icon
        name={value ? 'check-square' : 'square'}
        size={20}
        color="#f6f6f6"
      />
    </Pressable>
  );
};

export default Checkbox;
