import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  Switch,
  Image,
} from 'react-native';
import React, {useContext, useEffect, useMemo} from 'react';

import {useNavigation} from '@react-navigation/native';
import Header from '../../components/controls/Header';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  Button,
  Confirmation,
  Dropdown,
  Loading,
  Textfield,
} from '../../components/controls';
import {ADD_DEVICE} from '../../context/actions';
import {StoreContext} from '../../context/store';
import ImagePicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/Feather';
import {withLoading} from '../../hoc';
import {optionType} from '../../components/controls/Dropdown';
import {deviceErrorType, formType} from './types';

const options: optionType[] = [
  {
    id: 'electronics',
    name: 'Electronics',
  },
  {
    id: 'gadgets',
    name: 'Gadgets',
  },
  {
    id: 'appliances',
    name: 'Appliances',
  },

  {
    id: 'others',
    name: 'Others',
  },
];

const AddDevices = (props: any) => {
  const nav = useNavigation();
  const store = useContext(StoreContext);
  const loading = store.state?.appState.loading;
  const [open, setOpen] = React.useState(false);
  const [errors, setError] = React.useState<deviceErrorType<string[]>>();

  const room = props.route.params.room;

  const [formData, setFormData] = React.useState<formType>({
    device_name: '',
    switch_number: '',
    device_type: undefined,
    device_image_path: '',
    status: 'off',
    room_id: room.slug,
  });

  const handleChange = ({id, text}: {id: string; text: string}) => {
    setFormData({...formData, [id]: text});
  };

  const handleChangeDropdown = (val: optionType) => {
    setFormData({...formData, device_type: val});
  };

  const _reset = () => {
    setFormData({
      device_name: '',
      switch_number: '',
      device_type: undefined,
      device_image_path: '',
      status: 'off',
      room_id: room.slug,
    });
    setError(undefined);
  };

  const handleSave = async () => {
    try {
      const data = await ADD_DEVICE(formData);

      if (data.status === 'success') {
        store.dispatch({
          type: 'ADD_DEVICE',
          payload: {...data.device, room_slug: room.slug},
        });
        setOpen(false);
        _reset();
      }
    } catch (error: any) {
      setOpen(false);
      if (error.errors) {
        setError(error.errors);
      }
    }
  };

  const handleGetImage = () => {
    ImagePicker.openPicker({
      width: 200,
      height: 200,
      cropping: true,
    }).then(image => {
      setFormData({...formData, device_image_path: image});
    });
  };

  if (loading) return <Loading />;

  return (
    <View style={styles.container}>
      <Confirmation
        height={220}
        open={open}
        btnText="Confirm"
        text="You`re about to add a new device, are you sure to continue?"
        title="Confirmation"
        onClose={() => {
          setOpen(false);
        }}
        onConfirm={() => {
          handleSave();
        }}
      />
      <ImageBackground
        style={styles.bg}
        source={require('../../images/bg.jpg')}
        resizeMode="cover">
        <Header
          title="Add Device"
          onBack={() => {
            nav.goBack();
          }}
        />
        <KeyboardAwareScrollView style={{flex: 1}}>
          <View style={styles.content}>
            <View style={[styles.textContainer]}>
              <Text style={styles.text}>Device Image</Text>
              {/* <Button
                  onPress={() => {
                    handleGetImage();
                  }}>
                  Upload
                </Button> */}
              {formData.device_image_path ? (
                <TouchableOpacity
                  onPress={() => {
                    handleGetImage();
                  }}
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 300,
                  }}>
                  <Image
                    source={{
                      uri: formData.device_image_path.path,
                    }}
                    resizeMode="cover"
                    style={{width: '100%', height: '100%'}}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    handleGetImage();
                  }}
                  style={{
                    padding: 10,
                    borderRadius: 10,
                    borderColor: '#969696',
                    borderStyle: 'dashed',
                    borderWidth: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 300,
                  }}>
                  <Icon name="image" size={50} />
                  <Text>Select Image</Text>
                </TouchableOpacity>
              )}
            </View>
            <View style={[styles.textContainer]}>
              <Textfield
                label="Device Name"
                errorMessage={
                  errors?.device_name ? errors?.device_name[0] : undefined
                }
                value={formData.device_name}
                onChangeText={text => {
                  handleChange({
                    id: 'device_name',
                    text,
                  });
                }}
              />
            </View>
            <View style={[styles.textContainer]}>
              <Textfield
                label="Switch Number"
                keyboardType="numeric"
                value={formData.switch_number}
                errorMessage={
                  errors?.switch_number ? errors?.switch_number[0] : undefined
                }
                onChangeText={text => {
                  handleChange({
                    id: 'switch_number',
                    text,
                  });
                }}
              />
            </View>
            <View style={[styles.textContainer]}>
              <Dropdown
                label="Device Type"
                errorMessage={
                  errors?.device_type ? errors?.device_type[0] : undefined
                }
                options={options}
                placeholder="Select Device Type"
                keyboardType="default"
                selected={formData.device_type}
                onChange={val => {
                  handleChangeDropdown(val);
                }}
              />
            </View>
            <View style={[styles.textContainer]}>
              <Text style={styles.text}>Status</Text>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: '#fff',
                  padding: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderRadius: 10,
                }}>
                <Text style={styles.text3}>{formData.status}</Text>
                <Switch
                  value={formData.status === 'on'}
                  thumbColor={'#fff'}
                  onChange={() => {
                    setFormData({
                      ...formData,
                      status: formData.status === 'on' ? 'off' : 'on',
                    });
                  }}
                />
              </View>
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setOpen(true);
              }}>
              <Text style={styles.btnText}>Save Device</Text>
            </TouchableOpacity>
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
  textContainer: {
    marginBottom: 20,
  },
  text2: {
    fontWeight: 'bold',
    fontSize: 30,
  },
  boxx: {
    padding: 10,
    borderRadius: 10,
    borderColor: '#fff',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '47%',
  },
  content: {
    padding: 20,
    paddingHorizontal: 30,
    borderRadius: 10,
    width: '100%',
    backgroundColor: 'transparent',
  },
  text3: {
    fontSize: 17,
  },
  text: {
    fontSize: 17,
    marginBottom: 10,
  },
  bg: {
    width: '100%',
    flex: 1,
  },
  render: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  button: {
    width: '100%',
    padding: 15,
    backgroundColor: '#3d9af0',
    borderRadius: 30,
    alignItems: 'center',
  },
  btnText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default withLoading(AddDevices);
