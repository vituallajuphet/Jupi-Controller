import {View, StyleSheet, Image, Modal} from 'react-native';
import React from 'react';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

const duration = 1600;
const easing = Easing.bezier(0.25, -0.5, 0.25, 1);

const Loading = () => {
  const sv = useSharedValue(0);

  React.useEffect(() => {
    sv.value = withRepeat(withTiming(1, {duration, easing}), -1);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{rotate: `${sv.value * 360}deg`}],
  }));

  return (
    <Modal visible>
      <View style={styles.container}>
        <Animated.View style={[styles.image, animatedStyle]}>
          <Image
            style={[styles.image]}
            source={require('../../../assets/images/logo.jpg')}
          />
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  image: {
    width: 50,
    height: 50,
  },
});

export default Loading;
