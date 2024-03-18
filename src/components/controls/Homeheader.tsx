import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'

const Homeheader = () => {
  return (
    <View style={[
      {
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }
    ]}>
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 10
      }}>
        <Image
          style={{
            width: 50,
            height: 50,
            borderRadius: 50,
          }}
          source={require('../../images/img.png')}
        />
        <View>
          <Text style={styles.name}>Juphet Vitualla</Text>
          <Text style={{ fontSize: 14 }}>All is in your hand now</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  img: {

  },
  name: {
    fontSize: 19,
    fontWeight: 'bold',
    color: 'white'
  }
})

export default Homeheader