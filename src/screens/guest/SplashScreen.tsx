import React, { useEffect } from 'react';
import { Image, StyleSheet, View } from 'react-native';

const SplashScreen = props => {
  return (
    <View style={style.container}>
      <Image
        style={style.image}
        source={require('../../../assets/images/layout_screen.png')}
      />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  image: {
    width: 200,
    height: 200,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 17,
  },
});

export default SplashScreen;
