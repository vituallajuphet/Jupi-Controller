import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React, {useContext} from 'react';
import {LoginContext} from '../../context';
import {useNavigation} from '@react-navigation/native';
import {StoreContext} from '../../context/store';

const Homeheader = () => {
  const store = useContext(StoreContext);

  const auth = store.state?.user?.auth;
  const nav = useNavigation();

  const jumpToProfile = () => {
    nav.navigate('UserProfile');
  };

  return (
    <TouchableOpacity onPress={jumpToProfile} style={styles.container}>
      <View style={styles.inner}>
        <Image style={styles.img} source={require('../../images/img.png')} />
        <View>
          <Text style={styles.name}>{auth.name}</Text>
          <Text style={{fontSize: 14}}>All is in your hand now</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  img: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  inner: {flexDirection: 'row', alignItems: 'center', columnGap: 10},
  container: {
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 19,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default Homeheader;
