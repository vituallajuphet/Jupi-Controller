import {
  View,
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
} from 'react-native';
import React from 'react';
import {Text} from '.';

type TextfieldProps = TextInputProps & {
  errorMessage?: string | Array<string>;
  label?: string;
};

const Textfield = (props: TextfieldProps) => {
  const {errorMessage, label} = props;
  const inputStyle: TextStyle = props.multiline
    ? {
        height: 100,
        textAlignVertical: 'top',
      }
    : {};

  const colorborder = errorMessage ? '#fa8d8d' : '#fff';

  const _renderError = () => {
    if (Array.isArray(errorMessage)) {
      return errorMessage.map((error, index) => (
        <Text key={index} style={[styles.errorTxt, {marginBottom: 5}]}>
          {error}
        </Text>
      ));
    }
    return <Text style={styles.errorTxt}>{errorMessage}</Text>;
  };

  return (
    <>
      <Text style={[styles.label, {color: colorborder}]}>{label}</Text>
      <View style={[styles.container, {borderColor: colorborder}]}>
        <TextInput {...props} style={[styles.textInput, inputStyle]} />
      </View>
      {errorMessage ? <View style={styles.error}>{_renderError()}</View> : null}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 10,
  },
  label: {
    fontSize: 17,
    marginBottom: 10,
  },
  error: {
    marginTop: 5,
  },
  errorTxt: {
    color: '#fa8d8d',
  },
  textInput: {width: '100%', padding: 10, paddingHorizontal: 15, color: '#fff'},
});

export default Textfield;
