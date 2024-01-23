import React, { useState, useEffect, useRef } from 'react';
import { Animated, View, TouchableOpacity, Text, Pressable, TextInput, StyleSheet, Keyboard, ActivityIndicator  } from 'react-native';
import { Icon, Button, useTheme, SegmentedButtons } from 'react-native-paper';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import Spacer from './Spacer';
import { SwipeListView } from 'react-native-swipe-list-view';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { IconPicker } from '@grassper/react-native-icon-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { differenceInDays } from 'date-fns';


const ListItem = ({ label, icon, taskFreq, taskDate, daysNum, index, onDelete }) => {

  const theme = useTheme();


  state = {
    value: 0,
    listViewData: [{}]
  }

  const [checked, setChecked] = React.useState(false);

  const fadeAnim = useRef(new Animated.Value(1)).current;

  const fadeOut = () => {
    // Will change fadeAnim value to 0 in 3 seconds
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  console.log("Refreshed CheckList.js...");

  if (taskFreq == 'recurring') 
  {
    if (differenceInDays(new Date(), taskDate) == daysNum || differenceInDays(new Date(), taskDate) % daysNum == 0 || differenceInDays(new Date(), taskDate) == 0)
    {
      return (
        <Animated.View style={{ opacity: fadeAnim, flexDirection: 'row', alignItems: 'center', marginRight: 20, marginBottom: 10}}>
          <SwipeListView
          disableRightSwipe
          rightOpenValue={-50}
          data={this.state.listViewData}
          renderItem={() => (
              <View style={[styles.rowFront, {backgroundColor: theme.colors.background, borderBottomColor: theme.colors.background}]}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10}}>
                  <BouncyCheckbox
                  size={25}
                  fillColor="blue"
                  TouchableComponent={Pressable}
                  unfillColor={theme.colors.background}
                  text={label} 
                  iconStyle={{ borderColor: "blue" }}
                  innerIconStyle={{ borderWidth: 2 }}
                  textStyle={{ fontFamily: "sans-serif-light", color: theme.colors.text, marginRight: 100, marginBottom: 5}}
                  onPress={() => { setChecked(!checked); if (!checked && taskFreq === 'one') {fadeOut(); setTimeout(() => {onDelete(index);}, 1000);}}}
                  style={{ flexDirection: 'row', flex: 1, marginLeft: 20 }}
                />
                <Icon source={icon} color={"blue"} size={25}/>
                <Text>  </Text>
                <Icon source={taskFreq === 'daily' ? 'repeat-variant' : taskFreq === 'recurring' ? 'calendar-refresh' : 'numeric-1-box'}  color={"blue"} size={25}/>
                </View>
              </View>
          )}
          renderHiddenItem={ () => (
              <View style={[styles.rowBack, {backgroundColor: theme.colors.background}]}>
                  <Text></Text>
                  <TouchableOpacity onPress={() => onDelete(index)}>
                  <Icon source="trash-can-outline" color={"red"} size={25} style={{marginBottom: 50}}/>
                  </TouchableOpacity>
              </View>
          )}
          />
        </Animated.View>
      );
    }
    else 
    {
      return (
        <Animated.View style={{ opacity: fadeAnim, flexDirection: 'row', alignItems: 'center', marginRight: 20, marginBottom: 10}}>
          <SwipeListView
          disableRightSwipe
          rightOpenValue={-50}
          data={this.state.listViewData}
          renderItem={() => (
              <View style={[styles.rowFront, {backgroundColor: theme.colors.background, borderBottomColor: theme.colors.background}]}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10}}>
                  <BouncyCheckbox
                  size={25}
                  fillColor="blue"
                  TouchableComponent={Pressable}
                  unfillColor={theme.colors.background}
                  text={"TEST"} 
                  iconStyle={{ borderColor: "blue" }}
                  innerIconStyle={{ borderWidth: 2 }}
                  textStyle={{ fontFamily: "sans-serif-light", color: theme.colors.text, marginRight: 100, marginBottom: 5}}
                  onPress={() => { setChecked(!checked); if (!checked && taskFreq === 'one') {fadeOut(); setTimeout(() => {onDelete(index);}, 1000);}}}
                  style={{ flexDirection: 'row', flex: 1, marginLeft: 20 }}
                />
                <Icon source={icon} color={"blue"} size={25}/>
                <Text>  </Text>
                <Icon source={taskFreq === 'daily' ? 'repeat-variant' : taskFreq === 'recurring' ? 'calendar-refresh' : 'numeric-1-box'}  color={"blue"} size={25}/>
                </View>
              </View>
          )}
          renderHiddenItem={ () => (
              <View style={[styles.rowBack, {backgroundColor: theme.colors.background}]}>
                  <Text></Text>
                  <TouchableOpacity onPress={() => onDelete(index)}>
                  <Icon source="trash-can-outline" color={"red"} size={25} style={{marginBottom: 50}}/>
                  </TouchableOpacity>
              </View>
          )}
          />
        </Animated.View>
      );
    }
  }
  else 
  {
    return (
      <Animated.View style={{ opacity: fadeAnim, flexDirection: 'row', alignItems: 'center', marginRight: 20, marginBottom: 10}}>
        <SwipeListView
        disableRightSwipe
        rightOpenValue={-50}
        data={this.state.listViewData}
        renderItem={() => (
            <View style={[styles.rowFront, {backgroundColor: theme.colors.background, borderBottomColor: theme.colors.background}]}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10}}>
                <BouncyCheckbox
                size={25}
                fillColor="blue"
                TouchableComponent={Pressable}
                unfillColor={theme.colors.background}
                text={label} 
                iconStyle={{ borderColor: "blue" }}
                innerIconStyle={{ borderWidth: 2 }}
                textStyle={{ fontFamily: "sans-serif-light", color: theme.colors.text, marginRight: 100, marginBottom: 5}}
                onPress={() => { setChecked(!checked); if (!checked && taskFreq === 'one') {fadeOut(); setTimeout(() => {onDelete(index);}, 1000);}}}
                style={{ flexDirection: 'row', flex: 1, marginLeft: 20 }}
              />
              <Icon source={icon} color={"blue"} size={25}/>
              <Text>  </Text>
              <Icon source={taskFreq === 'daily' ? 'repeat-variant' : taskFreq === 'recurring' ? 'calendar-refresh' : 'numeric-1-box'}  color={"blue"} size={25}/>
              </View>
            </View>
        )}
        renderHiddenItem={ () => (
            <View style={[styles.rowBack, {backgroundColor: theme.colors.background}]}>
                <Text></Text>
                <TouchableOpacity onPress={() => onDelete(index)}>
                <Icon source="trash-can-outline" color={"red"} size={25} style={{marginBottom: 50}}/>
                </TouchableOpacity>
            </View>
        )}
        />
      </Animated.View>
    );
  }
};

const AddCheckboxModal = ({ navigation, handleAddCheckbox }) => {

  const theme = useTheme();

  const [showIconPicker, setShowIconPicker] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onSelect = (icon, searchText, iconName) => {
    console.log(iconName);
    setIcon(iconName);
    setShowIconPicker(false);
  };


  const [label, setLabel] = React.useState('');
  const [icon, setIcon] = React.useState('');
  const [taskFreq, setTaskFreq] = React.useState('daily');
  const taskDate = new Date();
  useEffect(() => {
    setTaskFreq('daily');
  }, []);
  const [daysNum, setDaysNum] = useState('');

  const handleDaysNum = (text) => {
    // Validate input to ensure it's a positive number
    setDaysNum(text);
    // if (/^\d+$/.test(text)) {
    //   setDaysNum(text);
    // }
  };


  const handleAdd = () => {
    // Validate input and add the new checkbox
    if (label && icon) {
      handleAddCheckbox({ label, icon, taskFreq, taskDate, daysNum });
      setLabel('');
      setIcon('');
      setTaskFreq('daily');
      setDaysNum('');
      navigation.navigate('Main')   
     }
  };

  const handleIconSelect = () => {
    Keyboard.dismiss();
    setIsLoading(true); // Show loading indicator
    setTimeout(() => {
      setShowIconPicker(true);
      setIsLoading(false); // Hide loading indicator
    }, 100); // Simulating delay, you can adjust the time as needed
  };
  
const handleCancel = () => {
  navigation.navigate('Main')
}



  return (
      <View style={[styles.modalContent, { backgroundColor: theme.colors.background }]}>
        <TextInput
          color={theme.colors.text}
          placeholderTextColor={theme.colors.text}
          placeholder="Task name..."
          value={label}
          onChangeText={text => setLabel(text)}
        />
        <Spacer height={20} /> 
        <View style={styles.iconButtonContainer}>
        <Button mode="contained" icon={icon} onPress={handleIconSelect}>Select Icon</Button>
        {isLoading && <ActivityIndicator style={styles.activityIndicator} size="small" color={theme.colors.primary} />}
      </View>
        {showIconPicker && (
        <View> 
          <IconPicker
    searchTitle={'Name'}
    numColumns={6}
    iconSize={20}
    iconColor="#fff"
    backgroundColor='#121212'
    placeholderText="Search Sleep, Run..."
    placeholderTextColor="#555"
    onClick={onSelect}
  />
  </View>
)}
      {!showIconPicker && (
        <View style={{ width: '100%', alignItems: "center"}}>
      <SegmentedButtons
        style={{marginTop: 25,  marginRight: 5, marginLeft: 5}}
        value={taskFreq}
        onValueChange={setTaskFreq}
        buttons={[
          {
            value: 'daily',
            label: 'Daily',
            icon: 'repeat-variant'
          },
          {
            value: 'recurring',
            label: 'Recurring',
            icon: 'calendar-refresh'
          },
          { 
            value: 'one', 
            label: 'One-Time',
            icon: 'numeric-1-box'
          },
        ]}
      />
      <Spacer height={10} />
      {taskFreq === 'recurring' && (
      <View style={{ flexDirection: 'row', alignItems: 'center'}}>
        <Text style={{color:theme.colors.text}}>
          The task will repeat for{'\u00A0'}
        </Text>
        <TextInput
          color={theme.colors.text}
          placeholderTextColor={theme.colors.text}
          placeholder="__"
          keyboardType="numeric"
          value={daysNum}
          onChangeText={handleDaysNum}
        />
        <Text style={{color:theme.colors.text}}>
        {'\u00A0'}days.
        </Text>
      </View>
      )}
      </View>
      )}
        <Spacer height={100} />
        <Button mode="contained" onPress={handleAdd}>Add</Button>
        <Spacer height={10} />
        <Button mode="contained" onPress={handleCancel}>Cancel</Button>
      </View>
);
};

const Stack = createNativeStackNavigator();


export default function CheckList() {

  const [checkboxes, setCheckboxes] = React.useState([]);

  useEffect(() => {
    // Load tasks from AsyncStorage when the component mounts
    const loadCheckboxes = async () => {
      try {
        const storedCheckboxes = await AsyncStorage.getItem('checkboxes');
        if (storedCheckboxes) {
          setCheckboxes(JSON.parse(storedCheckboxes));
        }
      } catch (error) {
        console.error('Error loading checkboxes from AsyncStorage: ', error);
      }
    };
    loadCheckboxes();
  }, []); // Empty dependency array ensures this effect runs only once on mount


  const handleAddCheckbox = (newCheckbox) => {
    setCheckboxes([...checkboxes, newCheckbox]);

    // Save updated checkboxes to AsyncStorage
    AsyncStorage.setItem('checkboxes', JSON.stringify([...checkboxes, newCheckbox]));
  };

  const handleDeleteCheckbox = (index) => {
    const newCheckboxes = [...checkboxes];
    newCheckboxes.splice(index, 1);
    setCheckboxes(newCheckboxes);

    // Save updated checkboxes to AsyncStorage
    AsyncStorage.setItem('checkboxes', JSON.stringify(newCheckboxes));
  };

  function MainScreen({ navigation }) {
    return (
      <View style={styles.container}>
        {checkboxes.map((checkbox, index) => (
          <ListItem key={index} label={checkbox.label} icon={checkbox.icon} taskFreq={checkbox.taskFreq} taskDate={checkbox.taskDate} daysNum={checkbox.daysNum} index={index} onDelete={handleDeleteCheckbox} />
          ))}
        <Spacer height={100} />
        <Button mode="contained" onPress={() => navigation.navigate('AddScreen')}>
          <Icon source="plus" size={20}/>
        </Button>      
      </View>
    );
  }

  return (
    <Stack.Navigator initialRouteName="Main" screenOptions={{headerShown: false}}>
      <Stack.Screen name="Main" component={MainScreen} />
      <Stack.Screen name="AddScreen">

        {(props) => (
          <AddCheckboxModal
            {...props}
            handleAddCheckbox={handleAddCheckbox}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  customButton: {
    padding: 10,
    borderRadius: 5,
  },
  rowFront: {
    alignItems: 'center',
    borderBottomWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
    height: 50,
},
  rowBack: {
    alignItems: 'center',
    backgroundColor: 'black',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
    paddingBottom: 13
  },
  iconButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  activityIndicator: {
    marginLeft: 10,
  },
});


