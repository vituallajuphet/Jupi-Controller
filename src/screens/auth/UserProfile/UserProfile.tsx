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

import {
  Button,
  Confirmation,
  Loading,
  Textfield,
} from '../../../components/controls';
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
import {
  UPDATE_PROFILE,
  UPDATE_PROFILE_INFO,
  UpdateProfileType,
} from '../../../context/actions';

type UserProfileProps = {};
type formType = {
  image?: any;
  cover_image?: any;
  current_password?: string;
  password?: string;
  password_confirmation?: string;
  contact?: string;
};

const UserProfile: FC<UserProfileProps> = (props: any) => {
  const store = useContext(StoreContext);
  const nav = useNavigation();
  const loading = store.state?.appState?.loading;
  const auth = store.state?.user?.auth;
  const [open, setOpen] = React.useState(false);

  const {setLoading} = useLoading(store);

  const [profile, setProfile] = React.useState<UpdateProfileType>({
    name: '',
    email: '',
    contact: '123',
    username: '',
  });

  const [form, setForm] = React.useState<formType>({
    image: '',
    current_password: '',
    password: '',
    password_confirmation: '',
    cover_image: '',
    contact: '',
  });

  useEffect(() => {
    setProfile(prev => ({
      ...prev,
      name: auth?.name,
      email: auth?.email,
      contact: auth?.meta?.meta?.contact,
      username: auth?.meta?.meta?.username,
    }));
  }, []);

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

  const handleUpdateInfo = async () => {
    setLoading(true);
    try {
      const data = await UPDATE_PROFILE_INFO(profile);
      store.dispatch({type: 'UPDATE_PROFILE', payload: data.user});
      setOpen(false);
      setLoading(false);
    } catch (error) {
      console.log('user data', error);
      setLoading(false);
    }
  };

  const updatePassword = async () => {
    try {
      const data = await UPDATE_PROFILE({image: form.image});
      store.dispatch({type: 'UPDATE_PROFILE', payload: data.user});
      setForm({image: ''});
    } catch (error) {
      console.log('user data', error);
    }
  };

  const handleChange = (key: string, value: string) => {
    setForm(prev => ({...prev, [key]: value}));
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
      <Confirmation
        open={open}
        title="Update Confirmation"
        btnText="Save"
        text="Are you sure to update your information?"
        onConfirm={() => {
          handleUpdateInfo();
        }}
        onClose={() => {
          setOpen(false);
        }}
      />
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
                  height={460}
                  headerIcon={<FIcon name="user" size={20} />}
                  title="Personal Information">
                  <View
                    style={{
                      padding: 20,
                    }}>
                    <View style={{marginBottom: 15}}>
                      <Textfield
                        label="Full Name"
                        onChangeText={text => {
                          setProfile(prev => ({...prev, name: text}));
                        }}
                        value={profile?.name}
                      />
                    </View>
                    <View style={{marginBottom: 15}}>
                      <Textfield
                        label="Username"
                        onChangeText={text => {
                          setProfile(prev => ({...prev, username: text}));
                        }}
                        value={profile?.username}
                      />
                    </View>
                    <View style={{marginBottom: 15}}>
                      <Textfield
                        editable={false}
                        keyboardType="email-address"
                        onChangeText={text => {
                          setProfile(prev => ({...prev, email: text}));
                        }}
                        label="Email"
                        value={profile?.email}
                      />
                    </View>

                    <Textfield
                      keyboardType="number-pad"
                      onChangeText={text => {
                        setProfile(prev => ({...prev, contact: text}));
                      }}
                      label="Contact No."
                      value={profile?.contact}
                    />
                    <View style={styles.btnContainer}>
                      <Button
                        onPress={() => {
                          setOpen(true);
                        }}
                        style={{
                          width: 60,
                          marginTop: 15,
                        }}>
                        Save
                      </Button>
                    </View>
                  </View>
                </Collapsable>
                <Collapsable
                  height={370}
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
                        onChangeText={text => {
                          handleChange('current_password', text);
                        }}
                      />
                    </View>
                    <View style={{marginBottom: 15}}>
                      <Textfield
                        label="New Password"
                        value={form.password}
                        onChangeText={text => {
                          handleChange('password', text);
                        }}
                      />
                    </View>
                    <View>
                      <Textfield
                        label="Confirm Password"
                        value={form.password_confirmation}
                        onChangeText={text => {
                          handleChange('password_confirmation', text);
                        }}
                      />
                    </View>
                    <View style={styles.btnContainer}>
                      <Button
                        onPress={() => {
                          updatePassword();
                        }}
                        style={{
                          width: 60,
                          marginTop: 15,
                        }}>
                        Save
                      </Button>
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
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
  },
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
