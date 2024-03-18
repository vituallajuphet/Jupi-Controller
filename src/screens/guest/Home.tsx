import React, { useEffect, useRef } from 'react';
import { Text, View, VoiceCommand } from '../../components/controls';
import { ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import Homeheader from '../../components/controls/Homeheader';
import WeatherHome from '../../components/controls/Weather';
import Sidebar from '../../components/controls/sidebar/Sidebar';
import axios from 'axios';

const Home = () => {
  const nav = useNavigation();


  useEffect(() => {
    console.log("reeee")
    axios.get('http://localhost:8000/api/testing/').then(res => {
      console.log("ress", res.data)
    }).catch(err => {
      console.warn("err", err)
    })
  }, [])



  const gotoTrainMachine = () => {
    nav.navigate('TrainScreen');
  };

  const ref = useRef<any>()

  const gotoController = () => {
    nav.navigate('Settings');
  };

  const open = () => {
    ref.current.handleOPen()
  }

  return (
    <>
      <Sidebar ref={ref} />

      <View style={style.container}>
        <ImageBackground
          style={style.bg}
          source={require('../../images/bg.jpg')}
          resizeMode="cover">
          <View style={{
            flex: 1,
            backgroundColor: 'transparent',
            padding: 10,
            paddingHorizontal: 20
          }}>
            <Homeheader />
            <WeatherHome />
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
            {/* <VoiceCommand /> */}
          </View>
        </ImageBackground >
      </View >
    </>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  box: {
    width: '48%',
    borderColor: '#878787',
    borderWidth: 1,
    height: 150,
    padding: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  boxContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    gap: 10,

    flex: 5
  },
  bg: {
    width: '100%',
    flex: 1,


  },
});

export default Home;
