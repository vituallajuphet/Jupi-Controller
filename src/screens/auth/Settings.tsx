import {
  View,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {Text, Textfield} from '../../components/controls';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {DataContext} from '../../context/dataContext';

const Settings = props => {
  const context = useContext(DataContext);

  const [data, setData] = useState<any>({
    server: '',
    switches: [],
  });

  useEffect(() => {
    setData(context.settings);

    return () => {};
  }, []);

  const render = () => {
    if (!data.switches.length) {
      return (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      );
    }

    const handleChange = ({
      id,
      text,
      idx,
    }: {
      id: string;
      text?: string;
      idx?: number;
    }) => {
      if (id === 'server') {
        setData({...data, server: text});
      } else {
        let switches = data.switches;
        switches[idx] = {...switches[idx], name: text};
        setData({...data, switches});
      }
    };

    return (
      <KeyboardAwareScrollView style={{flex: 1}}>
        <View style={styles.content}>
          <Text style={styles.text2}>Settings</Text>
          <View style={styles.textContainer}>
            <Text style={styles.text}>Server IP Address</Text>
            <Textfield
              value={data.server}
              onChangeText={text => {
                handleChange({
                  id: 'server',
                  text,
                });
              }}
            />
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.text}>Switch 1</Text>
            <Textfield
              value={data.switches[0].name}
              onChangeText={text => {
                handleChange({
                  id: 'switches',
                  text,
                  idx: 0,
                });
              }}
            />
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.text}>Switch 2</Text>
            <Textfield
              value={data.switches[1].name}
              onChangeText={text => {
                handleChange({
                  id: '1',
                  text,
                  idx: 1,
                });
              }}
            />
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.text}>Switch 3</Text>
            <Textfield
              onChangeText={text => {
                handleChange({
                  id: '1',
                  text,
                  idx: 2,
                });
              }}
              value={data.switches[2].name}
            />
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.text}>Switch 4</Text>
            <Textfield
              onChangeText={text => {
                handleChange({
                  id: '1',
                  text,
                  idx: 3,
                });
              }}
              value={data.switches[3].name}
            />
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              context.setSettings(data);
              Alert.alert('Settings Saved');
            }}>
            <Text style={styles.btnText}>Save Settings</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    );
  };

  return (
    <ImageBackground
      style={styles.bg}
      source={require('../../images/bg.jpg')}
      resizeMode="cover">
      {render()}
    </ImageBackground>
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
    marginBottom: 20,
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

export default Settings;
