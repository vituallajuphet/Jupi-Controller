import React from 'react';
import {Text, View} from '.';

import {StyleSheet} from 'react-native';

type TrainHeaderProps = {
  options?: any;
  title?: string;
};

const TrainHeader: React.FC<TrainHeaderProps> = ({options, title}) => {
  return (
    <View style={styles.header}>
      <Text style={styles.text}>{title || options.route.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 10,
    paddingVertical: 24,
    backgroundColor: '#222',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 17,
    color: '#fff',
  },
});

export default TrainHeader;
