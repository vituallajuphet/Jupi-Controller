import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  Switch,
} from 'react-native';
import React, {useCallback, useContext, useMemo} from 'react';
import Header from '../../components/controls/Header';
import {useNavigation} from '@react-navigation/native';
import {Image} from 'react-native';
import {theme} from '../../utils/color';
import {DELETE_DEVICES, GET_ROOMS, TOGGLE_SWITCH} from '../../context/actions';
import {StoreContext} from '../../context/store';
import EmptyList from './components/EmptyList';
import {Button} from '../../components/controls';
import {BASE_URL} from '../../utils';
import Checkbox from '../../components/controls/Checkbox';
import Icon from 'react-native-vector-icons/FontAwesome';
import {color} from '../../theme/theme';
import {SET_DEVICES, SET_ROOMS} from '../../context/reducers';

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
  const store = useContext(StoreContext);
  const [selected, setSelected] = React.useState<any[]>([]);
  const {room} = params;

  const rooms = store.state?.room;

  const handleSelectedChange = item => {
    if (selected?.findIndex(i => i.slug === item.slug) > -1) {
      setSelected(selected.filter(i => i.slug !== item.slug));
    } else {
      setSelected([...selected, item]);
    }
  };

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

  const deleteSelectedDevice = async () => {
    try {
      const data = await DELETE_DEVICES({
        slugs: selected.map(i => i.slug),
        room_id: room?.id,
      });

      if (data.status === 'success') {
        setData();
        setSelected([]);
        store.dispatch({
          type: SET_DEVICES,
          payload: {
            devices: data.devices,
            room_slug: room?.slug,
          },
        });
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const storeRooms = useMemo(() => {
    return rooms?.rooms?.length
      ? rooms?.rooms?.find(i => i.slug === room?.slug)
      : [];
  }, [rooms?.rooms]);

  const setData = async () => {
    try {
      const devices = await GET_ROOMS();
      store.dispatch({type: SET_ROOMS, payload: devices});
    } catch (error) {
      console.log('errr', error);
    }
  };

  const _isSelected = useCallback(
    items => {
      return selected?.findIndex(i => i.slug === items.slug) > -1;
    },
    [selected],
  );

  const hasSelected = useMemo(() => {
    return selected?.length > 0;
  }, [selected?.length]);

  const renderItem = ({item}) => {
    const isOn = item?.status === 'on';
    return (
      <TouchableOpacity
        style={styles.item}
        onLongPress={() => {
          handleSelectedChange(item);
        }}
        onPress={() => {
          if (hasSelected) {
            handleSelectedChange(item);
          }
        }}>
        {hasSelected ? (
          <Checkbox
            style={{
              position: 'absolute',
              right: 10,
              top: 10,
            }}
            onValueChange={() => {
              handleSelectedChange(item);
            }}
            value={_isSelected(item)}
          />
        ) : null}
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

  const _renderSelected = () => {
    if (!selected?.length) return null;
    return (
      <View
        style={{
          marginBottom: 15,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text
          style={{
            fontSize: 16,
          }}>
          Item Selected: {selected?.length}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            columnGap: 20,
          }}>
          <TouchableOpacity
            onPress={() => {
              deleteSelectedDevice();
            }}>
            <Icon name="trash" size={30} color={color.danger} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setSelected([]);
            }}>
            <Icon name="close" size={30} />
          </TouchableOpacity>
        </View>
      </View>
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
          {_renderSelected()}
          {storeRooms?.devices?.length ? (
            <>
              <FlatList
                showsVerticalScrollIndicator={false}
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
    position: 'relative',
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
