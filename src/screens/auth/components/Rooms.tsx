import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
  useColorScheme,
  Image,
} from 'react-native';
import React from 'react';
import {theme} from '../../../utils/color';
import {useNavigation} from '@react-navigation/native';

type roomType = {
  room_name?: string;
  descriptions?: string;
  slug: string;
  id: number;
};

type RoomProps = {
  rooms?: roomType[];
};

const Rooms: React.FC<RoomProps> = ({rooms, onToggleChange}) => {
  const scheme = useColorScheme();

  const nav = useNavigation();

  const renderComponent = ({item}: {item: roomType}) => {
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => {
          nav.navigate('DevicesScreen', {room: item});
        }}>
        <Image
          source={{uri: 'https://dummyimage.com/100x100/000/fff'}}
          style={{width: 60, height: 60, borderRadius: 50}}
        />
        <Text style={styles.itemText}>{item?.room_name}</Text>
        <Text>{item?.devices?.length} Devices</Text>
      </TouchableOpacity>
    );
  };

  const color = theme.color[scheme === 'dark' ? 'dark' : 'light'];

  return (
    <View>
      <View
        style={{
          marginBottom: 10,
          marginTop: 10,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text style={styles.name}>Your Rooms</Text>
        <TouchableOpacity
          style={[styles.addBtn, {backgroundColor: color.primary}]}>
          <Text style={styles.btnTxt}>Add</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        numColumns={2}
        scrollEnabled
        columnWrapperStyle={{gap: 10}}
        contentContainerStyle={{
          gap: 10,
        }}
        data={rooms}
        renderItem={renderComponent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
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
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  name: {
    fontSize: 19,
    fontWeight: 'bold',
    color: 'white',
  },
  addBtn: {
    backgroundColor: 'white',
    padding: 7,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  btnTxt: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Rooms;
