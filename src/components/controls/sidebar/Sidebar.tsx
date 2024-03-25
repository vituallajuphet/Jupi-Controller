import {
  View,
  Text,
  useColorScheme,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Modal,
  Pressable,
  FlatList,
} from 'react-native';
import React, {
  FC,
  forwardRef,
  useCallback,
  useContext,
  useImperativeHandle,
  useRef,
} from 'react';
import {theme} from '../../../utils/color';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Feather';
import {Button} from '..';
import {useNavigation} from '@react-navigation/native';
import {st} from '../../../utils';
import {StoreContext} from '../../../context/store';
import {LOGOUT} from '../../../context/actions';
import {useLoading} from '../../../context/hooks';

const {height} = Dimensions.get('window');
const Sidebar = forwardRef<View, any>((props, ref) => {
  const nav = useNavigation();
  const store = useContext(StoreContext);
  const {setLoading} = useLoading(store);

  const [open, setOpen] = React.useState(false);

  const width = useSharedValue(0);
  const opacity = useSharedValue(0);
  const scheme = useColorScheme();

  const data = [
    {key: 'Home', id: 'home', icon: 'home', active: true},
    {
      key: 'Settings',
      id: 'settings',
      icon: 'settings',
      active: false,
      onPress: () => {
        nav.navigate('Settings');
      },
    },
  ];

  const color = theme.color[scheme === 'dark' ? 'dark' : 'light'];

  const animStyles = useAnimatedStyle(() => {
    return {
      width: width.value,
      opacity: opacity.value,
    };
  });

  const handleOPen = useCallback(() => {
    setOpen(true);
    setTimeout(() => {
      width.value = withTiming(250, {duration: 100});
      opacity.value = withTiming(1, {duration: 100});
    }, 300);
  }, []);

  const handleClose = useCallback(() => {
    width.value = withTiming(0, {duration: 100});
    opacity.value = withTiming(0, {duration: 100});
    setTimeout(() => {
      setOpen(false);
    }, 300);
  }, []);

  const renderItems = ({item}: any) => {
    return (
      <TouchableOpacity
        style={{
          padding: 15,
          borderRadius: 10,
          backgroundColor: item.active ? color.primary : 'transparent',
          flexDirection: 'row',
          alignItems: 'center',
          columnGap: 10,
          marginBottom: 10,
        }}
        onPress={() => {
          width.value = withTiming(0, {duration: 100});
          opacity.value = withTiming(0, {duration: 100});
          setTimeout(() => {
            setOpen(false);
            item.onPress();
          }, 100);
        }}>
        <Icon name={item.icon} size={18} />
        <Text style={{color: '#fff', fontSize: 16, textTransform: 'uppercase'}}>
          {item.key}
        </Text>
      </TouchableOpacity>
    );
  };

  useImperativeHandle(
    ref,
    () => {
      return {
        handleOPen,
        handleClose,
      };
    },
    [handleOPen, handleClose],
  );

  const logoutUser = async () => {
    setLoading(true);
    try {
      const data = await LOGOUT();
      if (data.status === 'success') {
        store.dispatch({type: 'LOGOUT'});
        setLoading(false);
      }
    } catch (error) {
      console.log('error', error);
      setLoading(false);
    }
  };

  return (
    <View ref={ref}>
      <TouchableOpacity
        style={styles.menu}
        onPress={() => {
          handleOPen();
        }}>
        <Icon name="align-right" size={25} />
      </TouchableOpacity>
      <Modal visible={open} transparent>
        <View
          style={{
            flex: 1,
            width: '100%',
          }}>
          <Pressable
            style={styles.overlay}
            onPress={() => {
              handleClose();
            }}
          />
          <Animated.View
            style={[
              {backgroundColor: '#222'},
              animStyles,
              styles.animatedView,
            ]}>
            <View
              style={[
                styles.header,
                {
                  backgroundColor: color.primary,
                },
              ]}>
              <Text>Sidebar</Text>
            </View>
            <View>
              <FlatList
                contentContainerStyle={{padding: 10}}
                data={data}
                renderItem={renderItems}
              />
            </View>
            <View
              style={{
                paddingHorizontal: 10,
                position: 'absolute',
                bottom: 10,
                width: '100%',
              }}>
              <Button
                onPress={() => {
                  logoutUser();
                }}>
                Logout
              </Button>
              <View
                style={[
                  st('f-row items-center j-center'),
                  {padding: 10, marginTop: 10},
                ]}>
                <Text>Version: 1.0.0</Text>
              </View>
            </View>
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
});

const styles = StyleSheet.create({
  header: {
    padding: 15,
    height: 150,
  },
  menu: {
    position: 'absolute',
    right: 20,
    top: 22,
    zIndex: 100,
  },
  overlay: {
    height: height,
    width: '100%',
    backgroundColor: '#050505d3',
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 100,
  },
  animatedView: {
    position: 'absolute',
    right: 0,
    top: 0,
    height: '100%',
    zIndex: 111,
  },
});

export default Sidebar;
