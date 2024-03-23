import {View, Text, StyleSheet} from 'react-native';
import React, {FC} from 'react';
import {Button} from '../../../components/controls';
import {useNavigation} from '@react-navigation/native';

type EmptyListProps = {
  text?: string;
  heading?: string;
  room?: any;
};
const EmptyList: FC<EmptyListProps> = ({
  heading = 'Your list is Empty',
  text = 'No data found',
  room,
}) => {
  const nav = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <Text style={styles.heading}>{heading}</Text>
        <Text style={styles.text}>{text}</Text>
      </View>
      <Button
        onPress={() => {
          nav.navigate('AddDevices', {room: room});
        }}>
        Add Device
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 30,
  },
  inner: {
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 6,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
  },
});

export default EmptyList;
