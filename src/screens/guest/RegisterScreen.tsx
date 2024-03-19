import React, {useContext} from 'react';

import {Text, View} from '../../components/controls';
import {
  ImageBackground,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {LoginContext} from '../../context';
import {REGISTER_USER} from '../../context/actions';

const RegisterScreen: React.FC<any> = props => {
  const context = useContext(LoginContext);

  const [data, setData] = React.useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const {navigate} = props.navigation;
  const navigateLogin = () => {
    navigate('LoginScreen');
  };

  const register = async () => {
    const response = await REGISTER_USER(data);
    if (response.token) {
      context.register({
        token: response.token,
        user: response.user,
      });
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.bg}
        source={require('../../images/bg.jpg')}
        resizeMode="cover">
        <View style={styles.inner}>
          <View style={styles.headingContainer}>
            <Icon name="user" size={50} color="white" />
            <Text style={styles.heading}>Let's create your account!</Text>
            <Text style={styles.subtext}>
              Sign in to your account and start train your AI
            </Text>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Fullname"
              value={data.name}
              onChangeText={text => {
                setData({...data, name: text});
              }}
              style={styles.input}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Email Address"
              value={data.email}
              onChangeText={text => {
                setData({...data, email: text});
              }}
              style={styles.input}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              secureTextEntry
              placeholder="Password"
              value={data.password}
              onChangeText={text => {
                setData({...data, password: text});
              }}
              style={styles.input}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              secureTextEntry
              placeholder="Confirm Password"
              value={data.password_confirmation}
              onChangeText={text => {
                setData({...data, password_confirmation: text});
              }}
              style={styles.input}
            />
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              register();
            }}>
            <Text style={styles.btnText}>Register</Text>
          </TouchableOpacity>
          {/* <Button title="Biometric" onPress={prompt} /> */}

          <View style={styles.footer}>
            <Text>Already have an account? </Text>
            <TouchableOpacity
              onPress={() => {
                navigateLogin();
              }}>
              <Text style={styles.registerText}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 28,
    marginBottom: 10,
    marginTop: 10,
  },
  inner: {
    padding: 24,
    width: '100%',
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'transparent',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bg: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    width: '100%',
    backgroundColor: 'transparent',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    padding: 10,
    paddingHorizontal: 20,
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: 'transparent',
    borderRadius: 30,
    overflow: 'hidden',
    color: 'white',
    fontSize: 20,
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
  subtext: {
    fontSize: 17,
    color: '#c0c0c0',
  },
  headingContainer: {
    backgroundColor: 'transparent',
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fingerContainer: {
    backgroundColor: 'transparent',
  },
  finger: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    rowGap: 10,
  },
  fingerPrintIcon: {
    padding: 10,
    borderRadius: 100,
    borderBlockColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3d9af0',
  },
  footer: {
    marginTop: 30,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerText: {
    color: '#8ccfff',
    fontWeight: 'bold',
  },
});

export default RegisterScreen;
