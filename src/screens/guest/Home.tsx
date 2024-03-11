import React from 'react';
import {Text, View, VoiceCommand} from '../../components/controls';
import {ImageBackground, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome6';

const Home = () => {
  const nav = useNavigation();
  const gotoTrainMachine = () => {
    nav.navigate('TrainScreen');
  };

  const gotoController = () => {
    nav.navigate('Controller');
  };

  return (
    <View style={style.container}>
      <ImageBackground
        style={style.bg}
        source={require('../../images/bg.jpg')}
        resizeMode="cover">
        <View style={style.boxContainer}>
          <TouchableOpacity
            onPress={() => {
              gotoTrainMachine();
            }}
            style={style.box}>
            <Icon name="microchip" size={50} color={'#fff'} />
            <Text style={style.text}>Train Machine</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={style.box}
            onPress={() => {
              nav.navigate('SmartHomeScreen');
            }}>
            <Icon name="house-laptop" size={50} color={'#fff'} />
            <Text style={style.text}>Smart Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={style.box}>
            <Icon name="motorcycle" size={50} color={'#fff'} />
            <Text style={style.text}>Bike Control</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={style.box}
            onPress={() => {
              gotoController();
            }}>
            <Icon name="gear" size={50} color={'#fff'} />
            <Text style={style.text}>Settings</Text>
          </TouchableOpacity>
        </View>
        <VoiceCommand />
      </ImageBackground>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  box: {
    width: '40%',
    borderColor: '#878787',
    borderWidth: 1,
    height: 150,
    padding: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 5,
  },
  boxContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  bg: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Home;
