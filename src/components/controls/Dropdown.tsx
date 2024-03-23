import {
  View,
  StyleSheet,
  TextInputProps,
  Pressable,
  Modal,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React from 'react';
import {Text, Textfield} from '.';
import Icon from 'react-native-vector-icons/FontAwesome';

type DropdownProps = TextInputProps & {
  options: any[];
  placeholder?: string;
  onChange?: (value: any) => void;
};

const Dropdown = (props: DropdownProps) => {
  const {placeholder, options} = props;
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<any>(undefined);
  const [search, setSearch] = React.useState('');

  const rnderItem = ({item}) => {
    return (
      <Pressable
        style={{paddingVertical: 12}}
        onPress={() => {
          setSelected(item);
          setOpen(false);
        }}>
        <Text
          style={{
            fontSize: 18,
          }}>
          {item.name}
        </Text>
      </Pressable>
    );
  };

  return (
    <>
      <Modal visible={open} transparent>
        <View style={styles.modalContainer}>
          <Pressable onPress={() => setOpen(false)} style={styles.overlay} />
          <View style={styles.modalContent}>
            <View style={styles.headingContainer}>
              <Text style={styles.headingTxt}>Dropdown</Text>
              <TouchableOpacity
                onPress={() => {
                  setOpen(false);
                }}>
                <Icon name="close" size={25} />
              </TouchableOpacity>
            </View>
            <View>
              <View
                style={{
                  marginBottom: 10,
                }}>
                <Textfield
                  keyboardType="default"
                  value={search}
                  onChangeText={text => {
                    setSearch(text);
                  }}
                />
              </View>
              <FlatList data={options} renderItem={rnderItem} />
            </View>
          </View>
        </View>
      </Modal>
      <View style={styles.container}>
        {/* <TextInput {...props} style={[styles.textInput]} /> */}
        <Pressable
          onPress={() => {
            setOpen(true);
          }}
          style={[styles.textInput]}>
          <Text>{selected?.name || placeholder}</Text>
          <Icon name="chevron-down" size={15} />
        </Pressable>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 10,
  },
  headingTxt: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  headingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  modalContent: {
    height: '90%',
    backgroundColor: '#7976f4',
    bottom: 0,
    position: 'absolute',
    left: 0,
    width: '100%',
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
    padding: 20,
  },
  textInput: {
    width: '100%',
    padding: 15,
    paddingHorizontal: 15,
    color: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalContainer: {
    flex: 1,
  },
  overlay: {
    backgroundColor: '#000000aa',
    flex: 1,
  },
});

export default Dropdown;
