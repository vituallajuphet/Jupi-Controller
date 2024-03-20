import React, {forwardRef} from 'react';
import {
  TouchableOpacity,
  TouchableOpacityProps,
  Text,
  StyleSheet,
} from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
  // Add any additional props or customizations here
}

const Button = forwardRef<TouchableOpacity, ButtonProps>((props, ref) => {
  const {children, ...rest} = props;
  return (
    <TouchableOpacity {...rest} style={[rest.style, styles.button]} ref={ref}>
      <Text style={styles.btxt}>{children}</Text>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#37017e',
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
