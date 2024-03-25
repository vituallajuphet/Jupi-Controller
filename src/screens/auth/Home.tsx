import React, {useContext, useEffect, useRef} from 'react';
import {Text, View, VoiceCommand} from '../../components/controls';
import {
  ImageBackground,
  RefreshControl,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import Homeheader from '../../components/controls/Homeheader';
import WeatherHome from '../../components/controls/Weather';
import Sidebar from '../../components/controls/sidebar/Sidebar';
import {LoginContext} from '../../context';
import Rooms from './components/Rooms';
import {StoreContext} from '../../context/store';
import {GET_ROOMS} from '../../context/actions';
import {SET_ROOMS} from '../../context/reducers';
import {withLoading} from '../../hoc';

const Home = () => {
  const nav = useNavigation();
  const store = useContext(StoreContext);
  const room = store.state?.room;

  const [refreshing, setRefreshing] = React.useState(false);

  const gotoTrainMachine = () => {
    nav.navigate('TrainScreen');
  };

  const ref = useRef<any>();

  const gotoController = () => {
    nav.navigate('Settings');
  };

  const onRefresh = () => {
    setRefreshing(true);
    setData();
  };

  const open = () => {
    ref.current.handleOPen();
  };

  const setData = async () => {
    try {
      const devices = await GET_ROOMS();
      store.dispatch({type: SET_ROOMS, payload: devices});
      setRefreshing(false);
    } catch (error) {
      console.log('errr', error);
    }
  };

  useEffect(() => {
    setData();
  }, []);
  return (
    <>
      <Sidebar ref={ref} />

      <View style={style.container}>
        <ImageBackground
          style={style.bg}
          source={require('../../images/bg.jpg')}
          resizeMode="cover">
          <ScrollView
            scrollEnabled
            nestedScrollEnabled
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                padding: 10,
                paddingHorizontal: 20,
              }}>
              <Homeheader />
              <WeatherHome />
              <Rooms rooms={room?.rooms} />

              {/* <View style={style.boxContainer}>
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
            </View> */}
              {/* <VoiceCommand /> */}
            </View>
          </ScrollView>
        </ImageBackground>
      </View>
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

    flex: 5,
  },
  bg: {
    width: '100%',
    flex: 1,
  },
});

export default withLoading(Home);
