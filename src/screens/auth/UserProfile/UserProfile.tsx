import {View, Text, StyleSheet, ImageBackground, Image} from 'react-native';
import React, {useContext, useEffect, useMemo} from 'react';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {Loading} from '../../../components/controls';
import {LoginContext} from '../../../context';
import Header from '../../../components/controls/Header';
import {useNavigation} from '@react-navigation/native';
import {withLoading} from '../../../hoc';
import {BASE_URL} from '../../../utils';
import {color} from '../../../theme/theme';

const UserProfile = (props: any) => {
  const context = useContext(LoginContext);
  const {setLoading, loading} = context;
  const nav = useNavigation();

  console.log('context.auth.user', context.auth.user);

  if (loading) return <Loading />;

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.bg}
        source={require('../../../images/bg.jpg')}
        resizeMode="cover">
        <KeyboardAwareScrollView contentContainerStyle={{flex: 1}}>
          <View
            style={{
              flex: 1,
            }}>
            <View style={styles.cover}>
              <Image
                source={{
                  uri: `${BASE_URL}storage/2024/devices/0MVHvPWu0S1711262794.jpg`, // dummy profile url
                }}
                resizeMode="cover"
                style={styles.profile}
              />
            </View>
            <View style={{}}>
              <Text>{context.auth.user?.name}</Text>
              <Text>{context.auth.user?.email}</Text>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  bg: {
    width: '100%',
    flex: 1,
  },
  cover: {
    height: 140,
    width: '100%',
    backgroundColor: color.dark,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  profile: {
    height: 100,
    width: 100,
    borderRadius: 100,
    backgroundColor: 'red',
    zIndex: 20,
    position: 'absolute',
    top: 80,
    elevation: 0,
  },
});

export default withLoading(UserProfile);
