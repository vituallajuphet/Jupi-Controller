import React, {forwardRef} from 'react';
import {
  TouchableOpacity,
  TouchableOpacityProps,
  Text,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import {theme} from '../../utils/color';

interface ButtonProps extends TouchableOpacityProps {
  // Add any additional props or customizations here
}

const Button = forwardRef<TouchableOpacity, ButtonProps>((props, ref) => {
  const {children, ...rest} = props;
  const scheme = useColorScheme();
  const color = theme.color[scheme === 'dark' ? 'dark' : 'light'];

  return (
    <TouchableOpacity
      {...rest}
      style={[rest.style, styles.button, {backgroundColor: color.primary}]}
      ref={ref}>
      <Text style={styles.btxt}>{children}</Text>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  button: {
    padding: 14,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  btxt: {
    fontSize: 15,
    fontWeight: 'bold',
  },
});

export default Button;
