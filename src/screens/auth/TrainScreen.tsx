import React from 'react';
import {MessageWriter, Text, View} from '../../components/controls';
import {FlatList, StyleSheet} from 'react-native';
import {msg_data} from '../../data';

const TrainScreen = () => {
  const [data, setdata] = React.useState(msg_data);

  const flatRef = React.useRef<FlatList>(null);

  const handleSend = (msg: string) => {
    setdata([
      ...data,
      {id: data.length + 1, message: msg, type: 'you', date: '2021-09-01'},
    ]);
    flatRef.current?.scrollToEnd({animated: true});
  };
  const renderItem = ({item, index}: {item: (typeof data)[0]; index: any}) => {
    const boxStyle =
      item.type === 'you'
        ? {backgroundColor: '#0e0d0d'}
        : {backgroundColor: '#fff'};

    const pos = item.type === 'you' ? 'flex-end' : 'flex-start';
    const color = item.type === 'you' ? '#fff' : '#000';

    return (
      <View
        key={item.id}
        style={{
          flexDirection: 'row',
          justifyContent: pos,
        }}>
        <View style={[styles.content, boxStyle]}>
          <Text style={[styles.text, {color: color}]}>{item.message}</Text>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
        scrollEnabled
        ref={flatRef}
        data={data}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
      <MessageWriter onSend={handleSend} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#333',
    paddingTop: 20,
    flex: 1,
  },
  content: {
    padding: 10,
    margin: 10,
    borderRadius: 10,
    maxWidth: '75%',
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 17,
  },
});

export default TrainScreen;
