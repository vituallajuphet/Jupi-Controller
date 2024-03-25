import {View, Text, StyleSheet} from 'react-native';
import React, {FC, useContext} from 'react';
import {st} from '../../utils';
import Icon from 'react-native-vector-icons/Feather';
import {Button} from '.';
import axios from 'axios';
import {useDevicesCounts} from '../../hooks';
import {StoreContext} from '../../context/store';

const WeatherHome: FC<any> = props => {
  const store = useContext(StoreContext);
  const {active, inactive} = useDevicesCounts(store.state?.room?.rooms);
  return (
    <View style={styles.container}>
      <View>
        <View style={[st('gap-y-10')]}>
          <View style={[st('f-row itiems-center j-between'), styles.row]}>
            <View style={[st('f-row tems-center gap-x-3')]}>
              <Icon name="zap" size={25} />
              <Text style={styles.text}>Active Devices</Text>
            </View>
            <Text style={[styles.text, styles.textVal]}>{active}</Text>
          </View>
          <View style={[st('f-row items-center j-between')]}>
            <View style={[st('f-row items-center gap-x-3')]}>
              <Icon name="zap-off" size={25} />
              <Text style={styles.text}>Inactive</Text>
            </View>
            <Text style={[styles.text, styles.textVal]}>{inactive}</Text>
          </View>
        </View>
      </View>
      <Button style={{marginTop: 20}} onPress={() => {}}>
        TURN OFF ALL DEVICES
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#6464641f',
    padding: 20,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 15,
    marginTop: 15,
  },
  row: {
    borderBottomWidth: 1,
    borderColor: '#34246b',
    paddingBottom: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  textVal: {
    fontSize: 23,
    color: '#add3ff',
  },
});

export default WeatherHome;
