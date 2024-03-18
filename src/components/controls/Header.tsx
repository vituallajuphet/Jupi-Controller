import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { FC } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'

type HeaderHandler = {
    onBack?: () => void
    iconName?: string
    title: string
}

const Header: FC<HeaderHandler> = ({
    onBack,
    title,
    iconName
}) => {
    return (
        <>
            <View style={styles.container}>
                <Text style={styles.txt}>{title}</Text>
                <TouchableOpacity style={styles.back}
                    onPress={() => {
                        if (onBack) {
                            onBack()
                        }

                    }}
                >
                    <Icon name={iconName ? iconName : 'chevron-left'} size={20} color="#fff" />
                </TouchableOpacity>
            </View>
            <View style={{
                height: 60,
                backgroundColor: 'transparent',
            }} />
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        // marginBottom: 20,
        position: 'absolute',
        borderBottomWidth: 1,
        borderColor: '#2c2c30',
        padding: 10,
        paddingHorizontal: 20,
        zIndex: 100,
        top: 0,
        left: 0,
        width: '100%',

    },
    txt: {
        fontWeight: 'bold',
        fontSize: 25,
    },
    back: {
        position: 'absolute',
        left: 20,

        padding: 5,
    }
})

export default Header
