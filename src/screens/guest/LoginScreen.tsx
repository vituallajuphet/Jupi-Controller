import React, {useContext, useEffect, useState} from 'react';
import ReactNativeBiometrics, {BiometryTypes} from 'react-native-biometrics';
import {Loading, Text, View} from '../../components/controls';
import {
  ImageBackground,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {withLoading} from '../../hoc';
import {LOGIN} from '../../context/actions';
import {StoreContext} from '../../context/store';
import {useLoading} from '../../context/hooks';

const rnBiometrics = new ReactNativeBiometrics({allowDeviceCredentials: true});

const LoginScreen: React.FC<any> = props => {
  const store = useContext(StoreContext);
  const [supported, setSupported] = useState(false);
  const {navigate} = props.navigation;
  const [errors, setErrors] = useState<any>(undefined);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {setLoading} = useLoading(store);

  useEffect(() => {
    initializeBiometric();
  }, []);

  const initializeBiometric = async () => {
    rnBiometrics.isSensorAvailable().then(resultObject => {
      const {available, biometryType} = resultObject;
      if (available && biometryType === BiometryTypes.Biometrics) {
        setSupported(true);
      } else {
        setSupported(false);
      }
    });
  };

  const navigateRegister = () => {
    navigate('RegisterScreen');
  };

  const promptFingerPrint = () => {
    if (!supported) {
      return;
    }
    rnBiometrics
      .simplePrompt({
        promptMessage: 'Confirm fingerprint to Proceed',
        cancelButtonText: 'Cancel',
        fallbackPromptMessage: 'Please enter',
      })
      .then(resultObject => {
        const {success} = resultObject;

        if (success) {
          setLoading(true);
          LOGIN({email: 'test@test.com', password: 'pass1234'})
            .then(data => {
              store.dispatch({type: 'LOGIN', payload: data.user});
              setLoading(false);
            })
            .catch(error => {
              console.log('errr', error);
              setLoading(false);
            });
        } else {
          console.log('user cancelled biometric prompt');
        }
      })
      .catch(() => {
        console.log('biometrics failed');
      });
  };

  const login = async () => {
    setLoading(true);
    try {
      const data = await LOGIN({email, password});
      if (data?.user) {
        store.dispatch({type: 'LOGIN', payload: data.user});
        setLoading(false);
      }
    } catch (error: any) {
      setErrors(error.errors);
      setLoading(false);
    }
  };

  // const errorStyle = context.errors ? styles.inputError : null;

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.bg}
        source={require('../../images/bg.jpg')}
        resizeMode="cover">
        <View style={styles.inner}>
          <View style={styles.headingContainer}>
            <Icon name="user" size={50} color="white" />
            <Text style={styles.heading}>Let's sign you in!</Text>
            <Text style={styles.subtext}>
              Sign in to your account and start train your AI
            </Text>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Email"
              style={[styles.input]}
              onChangeText={text => {
                setEmail(text);
              }}
              value={email}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              secureTextEntry
              onChangeText={text => {
                setPassword(text);
              }}
              value={password}
              placeholder="Password"
              style={styles.input}
            />
            {errors ? (
              <View style={styles.errorContainer}>
                <Text style={styles.errorTxt}>
                  {errors?.login || errors?.email}
                </Text>
              </View>
            ) : null}
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              login();
            }}>
            <Text style={styles.btnText}>Login</Text>
          </TouchableOpacity>
          {supported && (
            <View style={styles.fingerContainer}>
              <TouchableOpacity
                style={styles.finger}
                onPress={promptFingerPrint}>
                <View style={styles.fingerPrintIcon}>
                  <Icon name="fingerprint" size={30} color="white" />
                </View>
                <Text>Login using Touch ID</Text>
              </TouchableOpacity>
            </View>
          )}
          <View style={styles.footer}>
            <Text>Don't have an account? </Text>
            <TouchableOpacity
              onPress={() => {
                navigateRegister();
              }}>
              <Text style={styles.registerText}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 35,
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
  errorTxt: {
    color: '#ca8787',
    fontSize: 15,
    marginBottom: 10,
  },
  errorContainer: {
    backgroundColor: 'transparent',
    marginTop: 5,
    paddingHorizontal: 5,
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
  inputError: {
    borderColor: '#ca8787',
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

export default withLoading(LoginScreen);
