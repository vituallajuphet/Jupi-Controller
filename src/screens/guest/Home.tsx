import React from 'react';
import {Text, View} from '../../components/controls';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const Home = () => {
  const nav = useNavigation();
  const gotoTrainMachine = () => {
    nav.navigate('TrainScreen');
  };

  return (
    <View style={style.container}>
      <View style={style.boxContainer}>
        <TouchableOpacity
          onPress={() => {
            gotoTrainMachine();
          }}
          style={style.box}>
          <Text style={style.text}>Train Machine</Text>
        </TouchableOpacity>
        <TouchableOpacity style={style.box}>
          <Text style={style.text}>Smart Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={style.box}>
          <Text style={style.text}>Bike Control</Text>
        </TouchableOpacity>
        <TouchableOpacity style={style.box}>
          <Text style={style.text}>Train</Text>
        </TouchableOpacity>
      </View>
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
  },
  boxContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'center',
  },
});

export default Home;
