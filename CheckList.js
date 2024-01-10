// import * as React from 'react';
// import { Icon } from 'react-native-paper';
// import BouncyCheckbox from "react-native-bouncy-checkbox";
// import { View, Pressable } from 'react-native';

// const CheckList = ({ label, icon }) => {
//   const [checked, setChecked] = React.useState(false);

//   return (
//     <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//       <Icon source={icon} color={"blue"} size={25} />
//       <BouncyCheckbox
//         size={25}
//         fillColor="blue"
//         TouchableComponent={Pressable}
//         unfillColor="black"
//         text={label} 
//         iconStyle={{ borderColor: "blue" }}
//         innerIconStyle={{ borderWidth: 2 }}
//         textStyle={{ fontFamily: "sans-serif-light", color: "white", marginRight: 100 }}
//         onPress={() => { setChecked(!checked); }}
//         style={{ flexDirection: 'row-reverse' }}
//       />
//     </View>
//   );
// };

// export default CheckList;

// import * as React from 'react';

import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Pressable, Modal, TextInput, Button, StyleSheet} from 'react-native';
import { Icon } from 'react-native-paper';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import IconPicker from "react-native-icon-picker";
import Spacer from './Spacer';


const CheckList = ({ label, icon }) => {
  const [checked, setChecked] = React.useState(false);


  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 20, marginBottom: 10}}>
      <BouncyCheckbox
        size={25}
        fillColor="blue"
        TouchableComponent={Pressable}
        unfillColor="black"
        text={label} 
        iconStyle={{ borderColor: "blue" }}
        innerIconStyle={{ borderWidth: 2 }}
        textStyle={{ fontFamily: "sans-serif-light", color: "white", marginRight: 100}}
        onPress={() => { setChecked(!checked); }}
        style={{ flexDirection: 'row', flex: 1, marginLeft: 20 }}
      />
      <Icon source={icon} color={"blue"} size={25} style={{marginRight: 50}}/>
    </View>
  );
};

const AddCheckboxModal = ({ visible, onClose, onAdd }) => {

  const [showIconPicker, setShowIconPicker] = useState(false);

  const onSelect = (icon) => {
    console.log(icon)
    setIcon(icon.icon);
    setShowIconPicker(false);
  };

  const [label, setLabel] = React.useState('');
  const [icon, setIcon] = React.useState('');

  const handleAdd = () => {
    // Validate input and add the new checkbox
    if (label && icon) {
      onAdd({ label, icon });
      setLabel('');
      setIcon('');
      onClose();
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContent}>
        <TextInput
          color={'white'}
          placeholderTextColor={'white'}
          placeholder="Task name..."
          value={label}
          onChangeText={text => setLabel(text)}
        />
        <Spacer height={20} />
        <TouchableOpacity style={styles.customButton}>
        <IconPicker
        showIconPicker={showIconPicker}
        toggleIconPicker={() => setShowIconPicker(!showIconPicker)}
        iconDetails={[
          {
            family: "MaterialCommunityIcons",
            color: "blue",
            icons: [
              "power-sleep",
              "dumbbell",
              "run-fast",
            ],
          },
        ]}
        content={<Text style={{ fontWeight: "bold", color: "white"}}>SELECT ICON</Text>}
        onSelect={onSelect}
      />
        </TouchableOpacity>
        <Spacer height={100} />
        <Button title="Add" onPress={handleAdd} />
        <Spacer height={10} />
        <Button title="Cancel" onPress={onClose}/>
      </View>
    </Modal>
  );
};

export default function App() {
  const [checkboxes, setCheckboxes] = React.useState([]);
  const [isModalVisible, setModalVisible] = React.useState(false);

  const handleAddCheckbox = (newCheckbox) => {
    setCheckboxes([...checkboxes, newCheckbox]);
  };

  return (
    <View style={styles.container}>
      {checkboxes.map((checkbox, index) => (
        <CheckList key={index} label={checkbox.label} icon={checkbox.icon} />
      ))}
      <Spacer height={100} />
      <Button title="  +  " onPress={() => setModalVisible(true)} />
      <AddCheckboxModal
        visible={isModalVisible}
        onClose={() => setModalVisible(false)}
        onAdd={handleAddCheckbox}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  customButton: {
    backgroundColor: "#3F4756",
    padding: 10,
    borderRadius: 5,
  },
});
