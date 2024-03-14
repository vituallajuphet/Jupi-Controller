import {View, StyleSheet, TextInput, TextInputProps} from 'react-native';
import React from 'react';

const Textfield = (props: TextInputProps) => {
  return (
    <View style={styles.container}>
      <TextInput {...props} style={styles.textInput} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 10,
  },
  textInput: {width: '100%', padding: 10, paddingHorizontal: 15, color: '#fff'},
});

export default Textfield;
