import {Text as RNText, TextProps, useColorScheme} from 'react-native';
import React from 'react';

const Text = React.forwardRef<RNText, TextProps>((props, ref) => {
  const colorScheme = useColorScheme();

  const color = colorScheme === 'dark' ? 'white' : '#333';

  return (
    <RNText
      ref={ref}
      {...props}
      style={[
        {
          color: color,
        },
        props.style,
      ]}>
      {props.children}
    </RNText>
  );
});

export default Text;
