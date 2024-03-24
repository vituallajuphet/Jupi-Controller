import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  Switch,
} from 'react-native';
import React, {useContext, useMemo} from 'react';
import Header from '../../components/controls/Header';
import {useNavigation} from '@react-navigation/native';
import {Image} from 'react-native';
import {theme} from '../../utils/color';
import {LoginContext} from '../../context';
import {GET_ROOMS, TOGGLE_SWITCH} from '../../context/actions';
import {StoreContext, StoreProvider} from '../../context/store';
import EmptyList from './components/EmptyList';
import {Button} from '../../components/controls';
import {BASE_URL} from '../../utils';

type deviceTypes = {
  room?: {
    room_name?: string;
    descriptions?: string;
    slug: string;
    id: number;
    devices: any[];
  };
};

const DevicesScreen = (props: any) => {
  const nav = useNavigation();
  const params: deviceTypes = props.route.params;
  const context = useContext(LoginContext);
  const store = useContext(StoreContext);

  const token = context.auth.token;
  const {room} = params;

  const handleToggle = async item => {
    await TOGGLE_SWITCH({
      slug: item.slug,
      status: item.status === 'on' ? 'off' : 'on',
    })
      .then(res => {
        setData();
      })
      .catch(err => {
        console.log('error', err);
      });
  };

  const storeRooms = useMemo(() => {
    return store.state?.rooms?.length
      ? store.state?.rooms?.find(i => i.slug === room?.slug)
      : [];
  }, [store.state?.rooms]);

  const setData = async () => {
    try {
      const devices = await GET_ROOMS();
      store.dispatch({type: 'SET_ROOMS', payload: devices});
    } catch (error) {
      console.log('errr', error);
    }
  };

  const renderItem = ({item}) => {
    const isOn = item?.status === 'on';

    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => {
          //   nav.navigate('DevicesScreen', {room: item});
        }}>
        <Image
          source={{
            uri:
              `${BASE_URL}${item?.device_image_path}` ||
              'https://dummyimage.com/100x100/000/fff',
          }}
          style={{width: 60, height: 60, borderRadius: 50}}
        />
        <Text style={styles.itemText}>{item?.device_name}</Text>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            marginTop: 10,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 14,
              color: '#797878',
            }}>
            {item?.status}
          </Text>
          <Switch
            onChange={() => {
              handleToggle(item);
            }}
            value={isOn}
            thumbColor={theme.color.dark.primary}
            trackColor={{false: '#767577', true: '#81b0ff'}}
          />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.bg}
        source={require('../../images/bg.jpg')}
        resizeMode="cover">
        <Header
          title={params.room?.room_name}
          onBack={() => {
            nav.goBack();
          }}
        />
        <View
          style={{
            flex: 1,
            padding: 10,
          }}>
          {storeRooms?.devices?.length ? (
            <>
              <FlatList
                data={storeRooms.devices}
                renderItem={renderItem}
                numColumns={2}
                columnWrapperStyle={{gap: 10}}
                contentContainerStyle={{
                  gap: 10,
                }}
              />
              <Button
                onPress={() => {
                  nav.navigate('AddDevices', {room: room});
                }}>
                Add Device
              </Button>
            </>
          ) : (
            <EmptyList room={room} />
          )}
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bg: {
    width: '100%',
    flex: 1,
  },
  item: {
    backgroundColor: '#2323236a',
    padding: 20,
    width: '48%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 6,
  },
  itemText: {
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default DevicesScreen;
