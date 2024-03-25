import React, {FC, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  useDerivedValue,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/FontAwesome';
import FIcon from 'react-native-vector-icons/Feather';
import {color} from '../../../theme/theme';

type CollapsableProps = {
  title: string;
  children?: React.ReactNode;
  headerIcon?: React.ReactNode;
};

const Collapsable: FC<CollapsableProps> = ({children, title, headerIcon}) => {
  const [isOpen, setIsOpen] = useState(false);
  const animatedHeight = useSharedValue(0);
  const opacity = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      height: withTiming(animatedHeight.value, {duration: 200}),
      opacity: withTiming(opacity.value, {duration: 200}),
    };
  });

  const toggle = () => {
    setIsOpen(!isOpen);
    animatedHeight.value = isOpen ? 0 : 100;
    opacity.value = isOpen ? 0 : 1;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggle} style={styles.pressableContainer}>
        <View style={styles.headingRight}>
          <View
            style={{
              backgroundColor: '#918cee82',
              borderRadius: 5,
              padding: 6,
            }}>
            {headerIcon}
          </View>
          <Text style={styles.headingText}>{title}</Text>
        </View>
        <Icon name={isOpen ? 'chevron-down' : 'chevron-right'} size={13} />
      </TouchableOpacity>
      <Animated.View style={[animatedStyles, styles.content]}>
        {children}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  headingText: {
    fontSize: 19,
    fontWeight: 'bold',
    color: color.white,
  },
  headingRight: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    columnGap: 10,
  },
  pressableContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  container: {
    paddingVertical: 10,
    marginBottom: 10,
    // borderBottomWidth: 1,
    // borderColor: color.light,
  },
  content: {},
});

export default Collapsable;
