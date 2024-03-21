import {
  View,
  Text,
  Modal,
  Pressable,
  StyleSheet,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {Button} from '.';
import Icon from 'react-native-vector-icons/FontAwesome';

type ConfirmationProps = {
  title?: string;
  text?: string;
  btnText?: string;
  onConfirm?: () => void;
  onClose?: () => void;
  open?: boolean;
  height?: number;
};

const Confirmation: React.FC<ConfirmationProps> = ({
  title,
  text,
  btnText,
  onConfirm,
  onClose,
  height = 220,
  open = false,
}) => {
  const _closeBtn = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          if (onClose) {
            onClose();
          }
        }}>
        <Icon name="close" size={28} />
      </TouchableOpacity>
    );
  };

  return (
    <Modal visible={open} transparent>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Pressable
          style={[styles.backdrop]}
          onPress={() => {
            if (onClose) {
              onClose();
            }
          }}
        />
        <View style={[styles.content, {minHeight: height}]}>
          <View style={{flex: 5}}>
            <View style={styles.header}>
              <Text style={{fontWeight: 'bold', fontSize: 20}}>{title}</Text>
              {_closeBtn()}
            </View>
            <View>
              <Text
                style={{
                  fontSize: 18,
                  lineHeight: 27,
                }}>
                {text}
              </Text>
            </View>
          </View>
          <View style={styles.footer}>
            <Button onPress={onConfirm}>{btnText}</Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.745)',
    flex: 1,
    position: 'absolute',
    height: '100%',
    width: '100%',
    left: 0,
    top: 0,
  },
  content: {
    width: '90%',
    borderRadius: 10,
    backgroundColor: '#8385ff',
    padding: 15,
    paddingBottom: 20,
    flexDirection: 'column',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
});

export default Confirmation;
