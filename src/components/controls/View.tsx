import {View as RNView, ViewProps, useColorScheme} from 'react-native';
import React from 'react';

const View = React.forwardRef<RNView, ViewProps>((props, ref) => {
  const colorScheme = useColorScheme();

  const {style} = props;

  const color = colorScheme === 'light' ? 'white' : '#333';

  return (
    <RNView
      ref={ref}
      {...props}
      style={[
        {
          backgroundColor: color,
        },
        style,
      ]}
    />
  );
});

export default View;
