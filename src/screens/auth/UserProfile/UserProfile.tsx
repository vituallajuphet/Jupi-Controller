import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import React, {useContext, useEffect, useMemo} from 'react';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {Loading, Textfield} from '../../../components/controls';
import {LoginContext} from '../../../context';
import Header from '../../../components/controls/Header';
import {useNavigation} from '@react-navigation/native';
import {withLoading} from '../../../hoc';
import {BASE_URL} from '../../../utils';
import {color} from '../../../theme/theme';
import Icon from 'react-native-vector-icons/FontAwesome';
import FIcon from 'react-native-vector-icons/Feather';
import {Collapsable} from '../../../components/controls/collapsable';
import ImageCropPicker from 'react-native-image-crop-picker';

const UserProfile = (props: any) => {
  const context = useContext(LoginContext);
  const {setLoading, loading} = context;
  const nav = useNavigation();

  const _renderEdit = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          handleGetImage();
        }}
        style={styles.profileBtn}>
        <Icon name="pencil" size={17} color={color.primary} />
      </TouchableOpacity>
    );
  };

  const handleGetImage = () => {
    ImageCropPicker.openPicker({
      width: 200,
      height: 200,
      cropping: true,
    })
      .then(image => {
        console.log('image', image);
      })
      .catch(err => {
        console.log('err', err);
      });
  };

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
            <ImageBackground
              style={styles.cover}
              source={require('./assets/cover.jpg')}
              resizeMode="cover">
              <View style={styles.overlay} />
              <View style={styles.profile}>
                {_renderEdit()}
                <Image
                  source={{
                    uri: `${BASE_URL}storage/2024/devices/0MVHvPWu0S1711262794.jpg`, // dummy profile url
                  }}
                  resizeMode="cover"
                  style={styles.profilePic}
                />
              </View>
            </ImageBackground>
            <View style={styles.contentBottom}>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 25,
                    fontWeight: 'bold',
                    color: '#fff',
                  }}>
                  {context.auth.user?.name}
                </Text>
                <Text>{context.auth.user?.email}</Text>
              </View>
              <View
                style={{
                  marginTop: 30,
                }}>
                <Collapsable
                  headerIcon={<FIcon name="user" size={20} />}
                  title="Personal Information">
                  <View
                    style={{
                      padding: 20,
                    }}>
                    <Textfield label="Name" value={context.auth.user?.name} />
                    <Textfield label="Name" value={context.auth.user?.name} />
                  </View>
                </Collapsable>
                <Collapsable
                  headerIcon={<FIcon name="settings" size={20} />}
                  title="Account Settings">
                  <View
                    style={{
                      padding: 20,
                    }}>
                    <Text>eeee</Text>
                  </View>
                </Collapsable>
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  profileBtn: {
    position: 'absolute',
    zIndex: 100,
    borderRadius: 100,
    backgroundColor: color.white,
    padding: 7,
    width: 30,
    height: 30,
    bottom: -5,
    right: 5,
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  contentBottom: {
    padding: 20,
    paddingTop: 50,
  },
  bg: {
    width: '100%',
    flex: 1,
  },
  cover: {
    height: 190,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  profilePic: {width: '100%', height: '100%', borderRadius: 100},
  profile: {
    height: 100,
    width: 100,
    borderRadius: 100,
    backgroundColor: 'red',
    zIndex: 20,
    position: 'absolute',
    top: 130,
    elevation: 0,
    borderWidth: 3,
    borderColor: '#fff',
  },
  overlay: {
    backgroundColor: '#0f0f0f7e',
    height: '100%',
    width: '100%',
  },
});

export default withLoading(UserProfile);
