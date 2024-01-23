import React, { useState } from 'react';
import { View, Modal, TextInput, StyleSheet, Button } from 'react-native';
import IconPicker from "react-native-icon-picker";
import Spacer from './Spacer';

const AddCheckboxModal = ({ navigation, route }) => {
  const [label, setLabel] = useState('');
  const [icon, setIcon] = useState('');

  const handleAdd = () => {
    if (label && icon) {
      route.params.onAdd({ label, icon });
      setLabel('');
      setIcon('');
      navigation.goBack();
    }
  };

  const onSelect = (icon) => {
    setIcon(icon.icon);
  };

  return (
    <Modal animationType="fade" visible={true} onRequestClose={() => navigation.goBack()}>
      <View style={styles.modalContent}>
        <TextInput
          placeholder="Task name..."
          value={label}
          onChangeText={text => setLabel(text)}
        />
        <Spacer height={20} />
        <IconPicker
          //... (your IconPicker props)
          onSelect={onSelect}
        />
        <Spacer height={100} />
        <Button title="Add" onPress={handleAdd} />
        <Spacer height={10} />
        <Button title="Cancel" onPress={() => navigation.goBack()} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AddCheckboxModal;
