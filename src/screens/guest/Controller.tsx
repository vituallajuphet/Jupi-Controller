import {View, Text, Button} from 'react-native';
import React, {useEffect} from 'react';
import ReactNativeBiometrics, {BiometryTypes} from 'react-native-biometrics';

const rnBiometrics = new ReactNativeBiometrics({allowDeviceCredentials: true});

const Controller = () => {
  useEffect(() => {
    initializeBiometric();
  }, []);

  const initializeBiometric = async () => {
    rnBiometrics.isSensorAvailable().then(resultObject => {
      const {available, biometryType} = resultObject;
      if (available && biometryType === BiometryTypes.Biometrics) {
        console.log('Biometrics is supported');
      } else {
        console.log('Biometrics not supported');
      }
    });
  };

  const prompt = () => {
    rnBiometrics
      .simplePrompt({promptMessage: 'Confirm fingerprint'})
      .then(resultObject => {
        const {success} = resultObject;

        if (success) {
          console.log('successful biometrics provided');
        } else {
          console.log('user cancelled biometric prompt');
        }
      })
      .catch(() => {
        console.log('biometrics failed');
      });
  };
  return (
    <View>
      <Text>Home</Text>
      <Button title="Biometric" onPress={prompt} />
    </View>
  );
};

export default Controller;
