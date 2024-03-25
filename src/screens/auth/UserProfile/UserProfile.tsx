import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import React, {FC, useContext, useEffect, useMemo} from 'react';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {Button, Loading, Textfield} from '../../../components/controls';
import Header from '../../../components/controls/Header';
import {useNavigation} from '@react-navigation/native';
import {withLoading} from '../../../hoc';
import {BASE_URL} from '../../../utils';
import {color} from '../../../theme/theme';
import Icon from 'react-native-vector-icons/FontAwesome';
import FIcon from 'react-native-vector-icons/Feather';
import {Collapsable} from '../../../components/controls/collapsable';
import ImageCropPicker from 'react-native-image-crop-picker';
import {StoreContext} from '../../../context/store';
import {useLoading} from '../../../context/hooks';
import {UPDATE_PROFILE} from '../../../context/actions';

type UserProfileProps = {};
type formType = {
  image?: any;
  current_password?: string;
  password?: string;
  password_confirmation?: string;
};

const UserProfile: FC<UserProfileProps> = (props: any) => {
  const store = useContext(StoreContext);
  const nav = useNavigation();
  const loading = store.state?.appState?.loading;
  const auth = store.state?.user?.auth;

  const {setLoading} = useLoading(store);

  const [form, setForm] = React.useState<formType>({
    image: '',
    current_password: '',
    password: '',
    password_confirmation: '',
  });

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

  const handleUpdateProfilePic = async () => {
    try {
      const data = await UPDATE_PROFILE({image: form.image});
      store.dispatch({type: 'UPDATE_PROFILE', payload: data.user});
      setForm({image: ''});
    } catch (error) {
      console.log('user data', error);
    }
  };

  const handleGetImage = () => {
    ImageCropPicker.openPicker({
      width: 200,
      height: 200,
      cropping: true,
    })
      .then(image => {
        setForm(prev => ({...prev, image: image}));
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
        <KeyboardAwareScrollView style={{flex: 1}}>
          <View>
            <ImageBackground
              style={styles.cover}
              source={require('./assets/cover.jpg')}
              resizeMode="cover">
              <View style={styles.overlay} />
              <View style={styles.profile}>
                {_renderEdit()}
                <Image
                  source={{
                    uri: `${BASE_URL}${auth?.profile_path}`, // dummy profile url
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
                  {auth?.name}
                </Text>
                <Text>{auth.email}</Text>
              </View>
              <View
                style={{
                  marginTop: 30,
                }}>
                <Collapsable
                  height={220}
                  headerIcon={<FIcon name="user" size={20} />}
                  title="Personal Information">
                  <View
                    style={{
                      padding: 20,
                    }}>
                    <View style={{marginBottom: 15}}>
                      <Textfield label="Name" value={auth.name} />
                    </View>
                    <Textfield
                      editable={false}
                      keyboardType="email-address"
                      label="Email"
                      value={auth?.email}
                    />
                  </View>
                </Collapsable>
                <Collapsable
                  height={300}
                  headerIcon={<FIcon name="lock" size={20} />}
                  title="Security">
                  <View
                    style={{
                      padding: 20,
                    }}>
                    <View style={{marginBottom: 15}}>
                      <Textfield
                        label="Current Password"
                        value={form.current_password}
                      />
                    </View>
                    <View style={{marginBottom: 15}}>
                      <Textfield label="New Password" value={form.password} />
                    </View>
                    <View style={{marginBottom: 15}}>
                      <Textfield
                        label="Confirm Password"
                        value={form.password_confirmation}
                      />
                    </View>
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
        <View style={{padding: 20}}>
          <Button
            onPress={() => {
              handleUpdateProfilePic();
            }}>
            Update
          </Button>
        </View>
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
