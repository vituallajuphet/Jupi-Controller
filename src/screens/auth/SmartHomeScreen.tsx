import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import React, { useContext } from 'react';
import axios from 'axios';
import { DataContext } from '../../context/dataContext';
import Icon from 'react-native-vector-icons/FontAwesome';
import Header from '../../components/controls/Header';

const SmartHomeScreen = (props) => {
  const context = useContext(DataContext);

  const switches = context.settings.switches || [];

  const URL = context.settings.server;

  const [light1State, setLight1State] = React.useState('off');
  const [light2State, setLight2State] = React.useState('off');
  const [light3State, setLight3State] = React.useState('off');
  const [light4State, setLight4State] = React.useState('off');

  const handePress1 = async () => {
    const url =
      light1State === 'off' ? `${URL}light-1-on` : `${URL}light-1-off`;
    const data = await axios.get(url);

    setLight1State(light1State === 'off' ? 'on' : 'off');
  };

  const handePress2 = async () => {
    const url =
      light2State === 'off' ? `${URL}light-2-on` : `${URL}light-2-off`;
    await axios.get(url);

    setLight2State(light2State === 'off' ? 'on' : 'off');
  };

  const handePress3 = async () => {
    const url =
      light3State === 'off' ? `${URL}light-3-on` : `${URL}light-3-off`;

    await axios.get(url);

    setLight3State(light3State === 'off' ? 'on' : 'off');
  };

  const handePress4 = async () => {
    const url =
      light4State === 'off' ? `${URL}light-4-on` : `${URL}light-4-off`;

    await axios.get(url);

    setLight4State(light4State === 'off' ? 'on' : 'off');
  };

  const colorActive = (isActive: boolean) => {
    return isActive ? '#00ff00' : '#f76c6c';
  };

  return (
    <>

      <View style={styles.container}>

        <ImageBackground
          style={styles.bg}
          source={require('../../images/bg.jpg')}
          resizeMode="cover">
          <Header
            title='Smart Home'
            onBack={() => {
              props.navigation.goBack();
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              gap: 10,
              padding: 20,
              flexWrap: 'wrap',
            }}>
            <TouchableOpacity
              style={styles.boxx}
              onPress={() => {
                handePress1();
              }}>
              <Text style={styles.text}>{switches[0].name}</Text>
              <Text
                style={[
                  styles.text,
                  styles.text2,
                  { color: colorActive(light1State === 'on') },
                ]}>
                {light1State}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                handePress2();
              }}
              style={styles.boxx}>
              <Text style={styles.text}>{switches[1].name}</Text>
              <Text
                style={[
                  styles.text,
                  styles.text2,
                  { color: colorActive(light2State === 'on') },
                ]}>
                {light2State}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                handePress3();
              }}
              style={styles.boxx}>
              <Text style={styles.text}>{switches[2].name}</Text>
              <Text
                style={[
                  styles.text,
                  styles.text2,
                  { color: colorActive(light3State === 'on') },
                ]}>
                {light3State}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                handePress4();
              }}
              style={styles.boxx}>
              <Text style={styles.text}>{switches[3].name}</Text>
              <Text
                style={[
                  styles.text,
                  styles.text2,
                  { color: colorActive(light4State === 'on') },
                ]}>
                {light4State}
              </Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
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
    padding: 10,
    margin: 10,
    borderRadius: 10,
    maxWidth: '75%',
    alignSelf: 'flex-start',
    backgroundColor: 'transparent',
  },
  text: {
    fontSize: 17,
  },
  bg: {
    width: '100%',
    flex: 1,
  },
  render: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
});

export default SmartHomeScreen;
