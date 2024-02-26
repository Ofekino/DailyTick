import React, { useState, useRef, useEffect } from 'react';
import { Animated, StyleSheet, Dimensions, View, Text, TouchableOpacity, TextInput, Keyboard, ActivityIndicator } from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';
import { IconButton, FAB, Modal, useTheme, Portal, Icon, Provider, Button, SegmentedButtons } from 'react-native-paper';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { IconPicker } from '@grassper/react-native-icon-picker';
import { differenceInDays } from 'date-fns';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spacer from './Spacer';
import DragList, {DragListRenderItemInfo} from 'react-native-draglist';
import {AutoDragSortableView} from 'react-native-drag-sort'; // TESTING PHASE
import uuid from 'react-native-uuid';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Zocial from 'react-native-vector-icons/Zocial';

import ColorPicker, { Panel1, Swatches, Preview, OpacitySlider, HueSlider } from 'reanimated-color-picker';


const {width} = Dimensions.get('window')

const parentWidth = width
const childrenWidth = width - 20
const childrenHeight = 48




export default function CheckList() {
  const theme = useTheme();

  const shakeAnimation = useRef(new Animated.Value(0)).current;


  const [textInputColor, setTextInputColor] = useState('gray');


  const [data, setData] = useState([
    // { id: '1', text: 'Item 1', checked: false },
    // { id: '2', text: 'Item 2', checked: false },
    // { id: '3', text: 'Item 3', checked: false },
    // Add more items as needed
  ]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const savedData = await AsyncStorage.getItem('checkListData');
        if (savedData) {
          const parsedData = JSON.parse(savedData);

        // Initialize fadeAnim for each item
        const dataWithFadeAnim = parsedData.map((item) => {
            console.log('Item ID:', item.id); // Log the item's ID
            return {
              ...item,
              fadeAnim: new Animated.Value(1),
            };
          });

          setData(dataWithFadeAnim);
        }
      } catch (error) {
        console.error('Error loading data from AsyncStorage:', error);
      }
    };

    loadData();
  }, []);

  // Save data to AsyncStorage whenever data changes
  useEffect(() => {
    const saveData = async () => {
      try {
        await AsyncStorage.setItem('checkListData', JSON.stringify(data));
      } catch (error) {
        console.error('Error saving data to AsyncStorage:', error);
      }
    };

    saveData();
  }, [data]);
  
  const [isModalVisible, setModalVisible] = useState(false);
  const [newTask, setNewTask] = useState('');
  const [icon, setIcon] = React.useState('');

  const [isLoading, setIsLoading] = useState(false);

  const [taskFreq, setTaskFreq] = React.useState('daily');

  const [taskColor, setTaskColor] = React.useState('blue');

  const fadeAnim = useRef(new Animated.Value(1)).current;

  const createFadeAnim = () => new Animated.Value(1);

  const animateFadeOut = (fadeAnim) => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500, // Adjust the duration as needed
      useNativeDriver: false, // Set to true if running on Android
    }).start(() => {
      // Perform any additional actions after the animation completes
    });
  };

  const taskDate = new Date();

  const [daysNum, setDaysNum] = useState('');

  const handleDaysNum = (text) => {
    // Validate input to ensure it's a positive number
    setDaysNum(text);
    // if (/^\d+$/.test(text)) {
    //   setDaysNum(text);
    // }
  };


  const toggleModal = () => setModalVisible(!isModalVisible);

  const handleIconSelect = () => {
    Keyboard.dismiss();
    setIsLoading(true); // Show loading indicator
    setTimeout(() => {
      setShowIconPicker(true);
      setIsLoading(false); // Hide loading indicator
    }, 100); // Simulating delay, you can adjust the time as needed
  };

  const handleColorSelect = () => {
    Keyboard.dismiss();
    setShowColorPicker(true);
  };



  const [iconComponent, setIconComponent] = useState(() => <Feather name="info" color={theme.colors.onBackground}  size={30}/>);

  const [iconFamily, setIconFamily] = useState(() => <FontAwesome/>);

  const onSelect = (selectedIcon, searchText, iconName, iconSet) => {
    console.log(iconName);
    console.log(iconSet);


    switch (iconSet) {
      case 'AntDesign':
        setIconComponent(<AntDesign name={iconName} color={theme.colors.onBackground}  size={30}/>);
        break;
      case 'Entypo':
        setIconComponent(<Entypo name={iconName} color={theme.colors.onBackground}  size={30}/>);
        break;
      case 'EvilIcons':
        setIconComponent(<EvilIcons name={iconName}  color={theme.colors.onBackground} size={30}/>);
        break;
      case 'Feather':
        setIconComponent(<Feather name={iconName} color={theme.colors.onBackground}  size={30}/>);
        break;
      case 'FontAwesome':
        setIconComponent(<FontAwesome name={iconName} color={theme.colors.onBackground}  size={30}/>);
        break;
      case 'FontAwesome5':
        setIconComponent(<FontAwesome5 name={iconName} color={theme.colors.onBackground}  size={30}/>);
        break;
      case 'Fontisto':
        setIconComponent(<Fontisto name={iconName} color={theme.colors.onBackground}  size={30}/>);
        break;
      case 'Foundation':
        setIconComponent(<Foundation name={iconName} color={theme.colors.onBackground}   size={30}/>);
        break;
      case 'Ionicons':
        setIconComponent(<Ionicons name={iconName} color={theme.colors.onBackground}  size={30}/>);
        break;
      case 'MaterialCommunityIcons':
        setIconComponent(<MaterialCommunityIcons name={iconName} color={theme.colors.onBackground}  size={30}/>);
        break;
      case 'MaterialIcons':
        setIconComponent(<MaterialIcons name={iconName} color={theme.colors.onBackground}  size={30}/>);
        break;
      case 'Octicons':
        setIconComponent(<Octicons name={iconName} color={theme.colors.onBackground}  size={30}/>);
        break;
      case 'SimpleLineIcons':
        setIconComponent(<SimpleLineIcons name={iconName} color={theme.colors.onBackground}  size={30}/>);
        break;
      case 'Zocial':
        setIconComponent(<Zocial name={iconName} color={theme.colors.onBackground} size={30}/>);
        break;
      default:
        // Default to FontAwesome if the library is not recognized
        setIconComponent(<Feather name="info" color={theme.colors.onBackground}  size={30}/>);
    }
    setIconFamily(iconSet);
    setIcon(iconName);
    setShowIconPicker(false);
  };
  

  const renderIcon = (iconName, iconFamily, taskColor) => {
    switch (iconFamily) {
      case 'AntDesign':
        return <AntDesign name={iconName} color={taskColor} size={25}/>;
      case 'Entypo':
        return <Entypo name={iconName} color={taskColor} size={25}/>;
      case 'EvilIcons':
        return <EvilIcons name={iconName} color={taskColor} size={25}/>;
      case 'Feather':
        return <Feather name={iconName} color={taskColor} size={25}/>;
      case 'FontAwesome':
        return <FontAwesome name={iconName} color={taskColor} size={25}/>;
      case 'FontAwesome5':
        return <FontAwesome5 name={iconName} color={taskColor} size={25}/>;
      case 'Fontisto':
        return <Fontisto name={iconName} color={taskColor} size={25}/>;
      case 'Foundation':
        return <Foundation name={iconName} color={taskColor} size={25}/>;
      case 'Ionicons':
        return <Ionicons name={iconName} color={taskColor} size={25}/>;
      case 'MaterialCommunityIcons':
        return <MaterialCommunityIcons name={iconName} color={taskColor} size={25}/>;
      case 'MaterialIcons':
        return <MaterialIcons name={iconName} color={taskColor} size={25}/>;
      case 'Octicons':
        return <Octicons name={iconName} color={taskColor} size={25}/>;
      case 'SimpleLineIcons':
        return <SimpleLineIcons name={iconName} color={taskColor} size={25}/>;
      case 'Zocial':
        return <Zocial name={iconName} color={taskColor} size={25}/>;
      default:
        return null;
    }
  };

  

  const renderRightActions = (progress, dragX, item, deleteItem) => {
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'flex-end', paddingLeft: 15 }}>
        <TouchableOpacity onPress={() => deleteItem(item.id)}>
        <View style={{marginTop: 10, marginRight: 0}}>
        <Icon source="trash-can-outline" color={'red'} size={25} />
        </View>
        </TouchableOpacity>
      </View>
    );
  };


  const deleteItem = (itemId, fadeAnim) => {
    fadeAnim && fadeAnim.stopAnimation();

    const updatedData = data.filter((item) => item.id !== itemId);
    setData(updatedData);
  };

  
  const addTask = () => {
    if (newTask.trim() !== '') {
      const updatedData = [
        ...data,
        {   id: uuid.v4(), text: newTask, checked: false, icon: icon, iconFamily: iconFamily, taskColor: taskColor, taskFreq: taskFreq, fadeAnim: new Animated.Value(1), taskDate: taskDate, daysNum: daysNum },
      ];
      setData(updatedData);
      setNewTask('');
      toggleModal();
    }
    else 
    {
      Animated.sequence([
        Animated.timing(shakeAnimation, { toValue: 10, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnimation, { toValue: -10, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnimation, { toValue: 10, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnimation, { toValue: 0, duration: 50, useNativeDriver: true }),
      ]).start();

      setTextInputColor('red');
    }
  };
  
  const [showIconPicker, setShowIconPicker] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);


  const [isDragged, setIsDragged] = useState(false);
  const [enableSwipe, setEnableSwipe] = useState(false);
  

  const handleItemClick = (item, index, fromIndex) => {
    
    console.log(`TEST`, fromIndex);
    setIsDragged(prevIsDragged => {
      if (prevIsDragged) {
        // If it was dragged, disable swipe
        setEnableSwipe(false);
        return false;
      }
      return prevIsDragged;
    });
  };
  
  const handleDragStart = (item, index) => {
    console.log(`UNDRAGGED`);
  
    setIsDragged(prevIsDragged => {
      if (!prevIsDragged) {
        // If it was undragged, enable swipe immediately
        setEnableSwipe(true);
        return true;
      }
      // If it was dragged, disable swipe
      setEnableSwipe(false);
  
      // Enable swipe after a delay
      setTimeout(() => {
        setEnableSwipe(true);
      }, 200); // Adjust the delay as needed
      return prevIsDragged;
    });
  };
  

  useEffect(() => {
    handleDragStart();
  }, []);
  


  const filteredData = data.filter(item => (
    item.taskFreq !== 'recurring' ||
    (
      differenceInDays(new Date(), item.taskDate) === item.daysNum ||
      differenceInDays(new Date(), item.taskDate) % item.daysNum === 0 ||
      differenceInDays(new Date(), item.taskDate) === 0
    )
  ));

  const [selectedColor, setSelectedColor] = useState('blue');



  const onSelectColor = (selectedColor) => {
    console.log(selectedColor);
    setTaskColor(selectedColor);
    setShowColorPicker(false);
  };

  
  const handleTextChange = (text) => {
    setNewTask(text);
    setTextInputColor('gray');
  };

  return (
    <Provider >
        <View style={{marginTop: 50}}></View>
<AutoDragSortableView 

onClickItem={handleItemClick} 
onDragStart={handleDragStart}
onDataChange={(newData) => {
  // Update each item's id to match its index
  const updatedData = newData.map((item, index) => ({
    ...item,
  }));

  // Update the state with this new data
  setData(updatedData);

}}
isDragFreely={false}	
delayLongPress={170}
dataSource={filteredData}
parentWidth={parentWidth}
childrenWidth={childrenWidth}
childrenHeight={childrenHeight}
marginChildrenTop={25}
maxScale={1.03}
keyExtractor={(item) => item.id}
renderItem={(item, index, drag) => {

    if (item.taskFreq === 'recurring' && 
    differenceInDays(new Date(), item.taskDate) !== item.daysNum &&
    differenceInDays(new Date(), item.taskDate) % item.daysNum !== 0 &&
    differenceInDays(new Date(), item.taskDate) !== 0) {
  return null; // Do not render the item
}

const renderItemContent = (
        <Animated.View style={{marginLeft: 15, opacity: item.fadeAnim }}>
            <View style={[styles.item, {backgroundColor: theme.colors.surface}]}>
              <BouncyCheckbox
                size={25}
                fillColor={item.taskColor}
                unfillColor={theme.colors.background}
                innerIconStyle={{ borderWidth: 2 }}
                textStyle={{ fontFamily: Platform.OS === 'android' ? 'sans-serif-light' : 'System', color: theme.colors.text, marginBottom: Platform.OS === 'android' ? 5 : 0}} text={item.text}
                isChecked={item.checked}
                onPress={(isChecked) => {
                    if (item.taskFreq === 'one') {
                      // Animate fade out before deleting
                      animateFadeOut(item.fadeAnim);
                      setTimeout(() => {
                        deleteItem(item.id, item.fadeAnim);
                      }, 500); // Adjust the delay to match the animation duration
                    } else {
                      const updatedData = data.map((dataItem) =>
                        dataItem.id === item.id ? { ...dataItem, checked: isChecked } : dataItem
                      );
                      setData(updatedData);
                      console.log(updatedData);
                      console.log(taskFreq !== 'recurring');
                    }
                  }}
              />
              <View style={{flex: 1}}></View>
              {/* {item.iconFamily}       */}
              {renderIcon(item.icon, item.iconFamily, item.taskColor)}
              {/* <Icon source={item.icon} color={'blue'} size={25} /> */}
                            
              <Text> </Text>
              <Icon
                source={
                  item.taskFreq === 'daily'
                    ? 'repeat-variant'
                    : item.taskFreq === 'recurring'
                    ? 'calendar-refresh'
                    : 'numeric-1-box'
                }
                color={item.taskColor}
                size={28}
              />
            </View>
          </Animated.View>
);
return (
  <Swipeable
    rightThreshold={60}
    leftThreshold={60}
    renderRightActions={(progress, dragX) => renderRightActions(progress, dragX, item, deleteItem)}
    enabled={enableSwipe} // Pass the enableSwipe state to enable or disable swipe
  >
    {renderItemContent}
  </Swipeable>
);

}}
/>
<View style={{marginTop: 70}}></View>

        <Portal>
        <Modal visible={isModalVisible} onDismiss={toggleModal} contentContainerStyle={[styles.modalContainer, {backgroundColor: theme.colors.surface}]}>
            <Text style={[styles.modalTitle, {color: theme.colors.text}]}>Add New Task</Text>
            <Animated.View style={{transform: [{ translateX: shakeAnimation }]}}>
            <TextInput
              style={[styles.input, { color: theme.colors.text, borderColor: textInputColor, }]}
              placeholderTextColor={theme.colors.text}
              placeholder="Task name..."
              value={newTask}
              onChangeText={handleTextChange} 
            />
            </Animated.View>
          <View style={{ marginLeft: 30, marginVertical: 10, flexDirection: "row", alignSelf: 'center', alignItems: 'center' }}>
            <Button mode="contained" onPress={handleIconSelect} style={{ marginHorizontal: 8 }}>Select Icon</Button>
            {iconComponent}
            {isLoading ? <ActivityIndicator size="small" color={theme.colors.primary} style={{marginLeft: 10}}/> : <View style={{ width: 30 }} />}
          </View>

          <View style={{ marginLeft: 30, marginVertical: 10, flexDirection: "row", alignSelf: 'center', alignItems: 'center' }}>
            <Button mode="contained" onPress={handleColorSelect} style={{ marginHorizontal: 5 }}>Select Color</Button>
            <MaterialCommunityIcons name={"checkbox-blank-circle"} size={30} color={taskColor} />
            <View style={{ width: 30 }} />
          </View>

            <SegmentedButtons
        style={{marginVertical: 25, marginHorizontal: -13}}
        value={taskFreq}
        onValueChange={setTaskFreq}
        buttons={[
          {
            value: 'daily',
            label: 'Daily',
            icon: 'repeat-variant',
            uncheckedColor: theme.colors.primary
          },
          {
            value: 'recurring',
            label: 'Recurring',
            icon: 'calendar-refresh',
            uncheckedColor: theme.colors.primary
          },
          { 
            value: 'one', 
            label: 'Once',
            icon: 'numeric-1-box',
            uncheckedColor: theme.colors.primary
          },
        ]}
      />    
            {taskFreq === 'recurring' && (
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, marginTop: -20}}>
        <Text style={{color:theme.colors.text}}>
          The task will repeat every{'\u00A0'}
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
            <Button mode="contained" onPress={addTask}>
              Add
            </Button>
          </Modal>
          {showIconPicker && (
            <View style={{backgroundColor: theme.colors.background, height: '100%', }}>
    <View style={{alignSelf: 'center', marginTop: 40, backgroundColor: theme.colors.background, width: '100%', marginBottom: 135}}>
    <IconPicker
      numColumns={6}
      iconSize={20}
      iconColor="#fff"
      backgroundColor='#121212'
      placeholderText="Search Sleep, Run..."
      placeholderTextColor="#555"
      onClick={onSelect}
      flatListStyle={{ alignSelf: 'center'}}
      textInputStyle={{marginHorizontal: 10}}
    />
    <Button mode="contained" onPress={() => setShowIconPicker(false)} >
              Cancel
    </Button>
    </View>
  </View>
  )}
{showColorPicker && (
      <View style={{alignSelf: 'center', alignItems: 'center', backgroundColor: theme.colors.background, width: '100%', height: '100%'}}>
<ColorPicker style={{ width: '80%', marginTop: 70, }} value={taskColor}   onComplete={(color) => setSelectedColor(color.hex)}>
<View style={{marginBottom: 30}}>
  <Panel1 />
  </View>
  <View style={{marginBottom: 30}}>
          <HueSlider />
  </View>
          <Swatches />
      </ColorPicker>
      <View style={{marginTop: 15, marginBottom: 15}}>
      <Button mode="contained" onPress={() => onSelectColor(selectedColor)}>
              Select
    </Button>
    </View>
      <Button mode="contained" onPress={() => setShowColorPicker(false)} >
              Cancel
    </Button>
  
      </View>
)}



        </Portal>

        <FAB
          style={styles.fab}
          mode="elevated" 
          icon="plus"
          onPress={toggleModal}
        />
    </Provider>
  );
}

const styles = StyleSheet.create({
    container: {
      marginTop: 50,
      flex: 1,
    },
    item: {
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 30,
      borderRadius: 18,
      flexDirection: 'row',
      alignItems: 'center',
    },
    activeItem: {
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 10,
      borderRadius: 18,
      flexDirection: 'row',
      alignItems: 'center',
    },
    fab: {
      position: 'absolute',
      alignSelf: 'center',
      margin: 16,
      bottom: 0,
    },  
    modalContainer: {
      padding: 20,
      margin: 15,
      borderRadius: 8,
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    input: {
      height: 45,
      borderWidth: 1,
      borderRadius: 15, 
      marginBottom: 10,
      padding: 8,
    },
    header: {
      height: 48,
      justifyContent: 'center',
      alignItems: 'center',
      borderBottomColor: '#2ecc71',
      borderBottomWidth: 2,
  },
  header_title: {
      color: '#333',
      fontSize: 24,
      fontWeight: 'bold',
  },
  item: {
      width: childrenWidth,
      height: childrenHeight,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#2ecc71',
      borderRadius: 4,
  },
  item_icon_swipe: {
      width: childrenHeight-10,
      height: childrenHeight-10,
      backgroundColor: '#fff',
      borderRadius: (childrenHeight - 10) / 2,
      marginLeft: 20,
      justifyContent: 'center',
      alignItems: 'center',
  },
  item_icon: {
      width: childrenHeight-20,
      height: childrenHeight-20,
      resizeMode: 'contain',
  },
  item_text: {
      color: '#fff',
      fontSize: 20,
      marginRight: 20,
      fontWeight: 'bold',
  }
  });
  