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
import React, {useContext, useMemo} from 'react';

import {useNavigation} from '@react-navigation/native';
import Header from '../../components/controls/Header';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Button, Confirmation, Textfield} from '../../components/controls';
import {ADD_ROOM} from '../../context/actions';
import {StoreContext} from '../../context/store';
import ImagePicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/Feather';

const AddRoomScreen = (props: any) => {
  const nav = useNavigation();
  const store = useContext(StoreContext);
  const [open, setOpen] = React.useState(false);

  const [formData, setFormData] = React.useState<any>({
    room_name: '',
    descriptions: '',
    image: undefined,
  });

  const handleChange = ({id, text}: {id: string; text: string}) => {
    setFormData({...formData, [id]: text});
  };

  const handleSave = async () => {
    try {
      const data = await ADD_ROOM(formData);
      if (data.status === 'success') {
        store.dispatch({type: 'ADD_ROOM', payload: data.room});
      }
    } catch (error) {
      console.log('errr', error);
    }
  };

  const handleGetImage = () => {
    ImagePicker.openPicker({
      width: 200,
      height: 200,
      cropping: true,
    }).then(image => {
      setFormData({...formData, image});
    });
  };

  return (
    <View style={styles.container}>
      <Confirmation
        height={220}
        open={open}
        btnText="Confirm"
        text="You`re about to add a new room, are you sure to continue?"
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
          title="Add Room"
          onBack={() => {
            nav.goBack();
          }}
        />
        <KeyboardAwareScrollView style={{flex: 1}}>
          <View style={styles.content}>
            <View style={[styles.textContainer]}>
              <Text style={styles.text}>Upload Room Picture</Text>
              {/* <Button
                onPress={() => {
                  handleGetImage();
                }}>
                Upload
              </Button> */}
              {formData.image ? (
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
                      uri: formData.image.path,
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
              <Text style={styles.text}>Room Name</Text>
              <Textfield
                value={formData.room_name}
                onChangeText={text => {
                  handleChange({
                    id: 'room_name',
                    text,
                  });
                }}
              />
            </View>
            <View style={[styles.textContainer]}>
              <Text style={styles.text}>Description</Text>
              <Textfield
                multiline
                value={formData.descriptions}
                onChangeText={text => {
                  handleChange({
                    id: 'descriptions',
                    text,
                  });
                }}
              />
            </View>

            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setOpen(true);
              }}>
              <Text style={styles.btnText}>Save Room</Text>
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

export default AddRoomScreen;
