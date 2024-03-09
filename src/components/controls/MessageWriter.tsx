import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  StyleProp,
  TextStyle,
  Text,
} from 'react-native';
import React, {useEffect, useRef} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import useKeyboardStatus from '../../hooks';
import Voice from '@react-native-voice/voice';

type MessageWriterProps = {
  onSend: (message: string) => void;
};

const MessageWriter: React.FC<MessageWriterProps> = ({onSend}) => {
  const textInputRef = useRef<TextInput>(null);
  const [text, setText] = React.useState('');
  const [micState, setMicState] = React.useState<'on' | 'off'>('off');

  const keyboardShown = useKeyboardStatus();

  const onSpeechStart = (e: any) => {
    setMicState('on');
  };
  const onSpeechRecognized = (e: any) => {};
  const onSpeechEnd = (e: any) => {
    setMicState('off');
  };

  const onSpeechResults = (e: any) => {
    setMicState('off');
  };
  const onSpeechPartialResults = (e: any) => {
    console.log('e.value', e.value);
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
      setMicState('off');
    };
  }, []);

  const keyboardStyle: StyleProp<TextStyle> = keyboardShown ? {flex: 1} : {};
  const handleSend = () => {
    onSend(text);
    setText('');
    setMicState('off');
    stopRecognizing();
    textInputRef.current?.blur();
  };

  const stopRecognizing = async () => {
    try {
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

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          startRecognizing();
        }}>
        <Icon
          name="mic"
          size={25}
          color={micState === 'off' ? '#bababa' : 'red'}
        />
      </TouchableOpacity>
      <TextInput
        ref={textInputRef}
        value={text}
        onChangeText={txt => {
          setText(txt);
        }}
        placeholder="Write a message..."
        style={[styles.textINput, keyboardStyle]}
      />
      {text.length > 0 && (
        <TouchableOpacity
          onPress={() => {
            handleSend();
          }}>
          <Icon name="send" size={25} color={'#99c9ff'} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 17,
  },
  inputcontainer: {
    padding: 5,
    paddingHorizontal: 15,
    borderRadius: 15,
    backgroundColor: '#9e9c9c',
    flexDirection: 'row',
    alignItems: 'center',
  },
  textINput: {
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#9e9c9c',
    padding: 5,
    paddingHorizontal: 10,
    fontSize: 15,
  },
  container: {
    padding: 10,
    height: 65,
    backgroundColor: '#555',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    columnGap: 10,
  },
});

export default MessageWriter;
