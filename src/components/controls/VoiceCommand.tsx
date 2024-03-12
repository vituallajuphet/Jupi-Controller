import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Voice from '@react-native-voice/voice';
import axios from 'axios';
import {AI_API} from '../../utils';

const URL = 'http://192.168.1.5/';

const VoiceCommand = () => {
  const [theText, setText] = React.useState<any>('');
  const onSpeechStart = (e: any) => {};
  const onSpeechRecognized = (e: any) => {};
  const onSpeechEnd = (e: any) => {
    console.log('eeeend');
  };

  const onSpeechResults = (e: any) => {
    // stopRecognizing(theText);
  };
  const onSpeechPartialResults = (e: any) => {
    if (e.value.length > 0) {
      setText(e.value[0]);
    }
  };

  useEffect(() => {
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechRecognized = onSpeechRecognized;

    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechPartialResults = onSpeechPartialResults;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const stopRecognizing = async text => {
    try {
      handleRequest(text);
      await Voice.stop();
    } catch (e) {
      console.error(e);
    }
  };

  const startRecognizing = async () => {
    try {
      await Voice.start('en-US');
    } catch (e) {
      console.error(e);
    }
  };

  const handleRequest = async (text: string) => {
    try {
      const data = await axios.post(AI_API, {message: text});

      console.log('data', data.data);
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.record}
        onPressIn={() => {
          startRecognizing();
        }}
        onPressOut={() => {
          setTimeout(() => {
            stopRecognizing(theText);
          }, 2000);
        }}>
        <Icon name="microphone" size={40} />
        <Text>Command</Text>
      </TouchableOpacity>
      <View>
        <Text>{theText}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  record: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 100,
    backgroundColor: '#f78888',
    borderRadius: 50,
  },
});

export default VoiceCommand;
