import React, { useState, useRef, useEffect } from 'react';
import { Dimensions, Animated, StyleSheet, View, Text, TouchableOpacity, TextInput, Keyboard, ActivityIndicator, } from 'react-native';
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';
import { IconButton, FAB, Modal, useTheme, Portal, Icon, Provider, Button, SegmentedButtons } from 'react-native-paper';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { IconPicker } from '@grassper/react-native-icon-picker';
import { differenceInDays } from 'date-fns';
import AsyncStorage from '@react-native-async-storage/async-storage';

  
import {DragSortableView} from 'react-native-drag-sort'; // TESTING PHASE



const {width} = Dimensions.get('window')

const parentWidth = width
const childrenWidth = width - 20
const childrenHeight = 48




export default function CheckList() {
  const theme = useTheme();




  const [data, setData] = useState([
    { id: '1', text: 'Item 1', checked: false },
    { id: '2', text: 'Item 2', checked: false },
    { id: '3', text: 'Item 3', checked: false },
    { id: '4', text: 'Item 3', checked: false },
    { id: '5', text: 'Item 3', checked: false },
  ]);
  
  


  useEffect(() => {
    const loadData = async () => {
      try {
        const savedData = await AsyncStorage.getItem('checkListData');
        if (savedData) {
          setData(JSON.parse(savedData));
        }
        console.log(JSON.parse(savedData).map(item => item.id));
        console.log(JSON.parse(savedData).map(item => item.checked));
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

  const taskDate = new Date();

  const [daysNum, setDaysNum] = useState('');

  const handleDaysNum = (text) => {
    // Validate input to ensure it's a positive number
    setDaysNum(text);
    // if (/^\d+$/.test(text)) {
    //   setDaysNum(text);
    // }
  };


  

  const fadeOut = (item) => {
    Animated.timing(item.fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      // After the fade-out animation is complete, delete the item
      deleteItem(item.id);
    });
  };

  const onSelect = (icon, searchText, iconName) => {
    console.log(iconName);
    setIcon(iconName);
    setShowIconPicker(false);
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

  const renderRightActions = (progress, dragX, item, deleteItem) => {
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'flex-end', paddingLeft: 15}}>
        <TouchableOpacity onPress={() => deleteItem(item.id)}>
        <View style={{marginTop: 10, marginRight: 0}}>
        <Icon source="trash-can-outline" color={'red'} size={25} />
        </View>
        </TouchableOpacity>
      </View>
    );
  };
  
  const deleteItem = (itemId) => {
    const updatedData = data.filter((item) => item.id !== itemId);
    setData(updatedData);
  };

  const addTask = () => {
    if (newTask.trim() !== '') {
      const newFadeAnim = new Animated.Value(1); // Create a new animated value for opacity
      const updatedData = [
        ...data,
        { id: (data.length + 1).toString(), text: newTask, checked: false, icon: icon, taskFreq: taskFreq, fadeAnim: newFadeAnim, taskDate: taskDate },
      ];
      setData(updatedData);
      setNewTask('');
      toggleModal();
    }
  };
  
  const [showIconPicker, setShowIconPicker] = useState(false);


//   AUTO_TEST_DATA = [
//     {icon: require('./assets/icon.png'),txt: 1},
//     {icon: require('./assets/icon.png'),txt: 2},
//     {icon: require('./assets/icon.png'),txt: 3},
//     {icon: require('./assets/icon.png'),txt: 4},
// ]

  // const [isDragged, setIsDragged] = useState(false);

  const [isDragged, setIsDragged] = useState(false);
  const [enableSwipe, setEnableSwipe] = useState(true);


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
  

  const saveDataToAsyncStorage = async (dataToSave) => {
    try {
      await AsyncStorage.setItem('checkListData', JSON.stringify(dataToSave));
    } catch (error) {
      console.error('Error saving data to AsyncStorage:', error);
    }
  };
  

  

  return (
    <Provider style={{flex: 1, marginTop: 50, marginLeft: 10}}>
<DragSortableView

  onClickItem={handleItemClick} 
  onDragStart={handleDragStart}
  onDataChange={(newData) => {
    // Update each item's id to match its index
    const updatedData = newData.map((item, index) => ({
      ...item,
      id: index.toString(), // Assuming you want the id to be a string
    }));

    // Update the state with this new data
    setData(updatedData);

    // Save the updated list to AsyncStorage
    saveDataToAsyncStorage(updatedData);
  }}

delayLongPress={170}
dataSource={data}
parentWidth={parentWidth}
childrenWidth={childrenWidth}
childrenHeight={childrenHeight}
marginChildrenTop={35}
maxScale={1.03}
keyExtractor={(item) => item.id}
renderItem={(item, index, drag) => {
  const renderItemContent = (
          <Animated.View style={{marginLeft: 15, opacity: item.fadeAnim}}>
              <View style={[styles.item, {backgroundColor: theme.colors.surface}]}>
                <BouncyCheckbox
                  size={25}
                  fillColor="blue"
                  unfillColor={theme.colors.background}
                  innerIconStyle={{ borderWidth: 2 }}
                  textStyle={{ fontFamily: 'sans-serif-light', color: theme.colors.text, marginBottom: 5}}
                  text={item.text}
                  isChecked={item.checked}
                  onPress={(isChecked) => {
                    if (taskFreq === 'one') {
                      fadeOut(item);
                    } else {
                      const updatedData = data.map((dataItem) =>
                        dataItem.id === item.id ? { ...dataItem, checked: isChecked } : dataItem
                      );
                      setData(updatedData);
                      console.log(updatedData);
                    }
                  }}
                />
                <View style={{flex: 1}}></View>
                <Icon source={item.icon} color={'blue'} size={25} />
                <Text> </Text>
                <Icon
                  source={
                    item.taskFreq === 'daily'
                      ? 'repeat-variant'
                      : item.taskFreq === 'recurring'
                      ? 'calendar-refresh'
                      : 'numeric-1-box'
                  }
                  color={'blue'}
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

        <Portal>

          <Modal visible={isModalVisible} onDismiss={toggleModal} contentContainerStyle={[styles.modalContainer, {backgroundColor: theme.colors.surface}]}>
            <Text style={[styles.modalTitle, {color: theme.colors.text}]}>Add New Task</Text>
            <TextInput
              style={[styles.input, {color: theme.colors.text}]}
              placeholderTextColor={theme.colors.text}
              placeholder="Task name..."
              value={newTask}
              onChangeText={(text) => setNewTask(text)}
            />
              <View style={styles.iconButtonContainer}>
              <Button mode="contained" icon={icon} onPress={handleIconSelect}>Select Icon</Button>
              {isLoading && <ActivityIndicator style={styles.activityIndicator} size="small" color={theme.colors.primary} />}
            </View>
            {/* {showIconPicker && (
              <View style={{marginTop: 100, height: '25%'}}>
                <IconPicker
                // iconContainerStyle={{width: 500}}
                  numColumns={5}
                  iconSize={20}
                  iconColor="#fff"
                  backgroundColor='#121212'
                  placeholderText="Search Sleep, Run..."
                  placeholderTextColor="#555"
                  onClick={onSelect}
                  flatListStyle={{alignSelf: 'center', marginBottom: 100}}
                />
              </View>
            )}       */}
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
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 25, marginTop: -20}}>
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
        </Portal>

        <FAB
          style={styles.fab}
          mode="elevated" 
          icon="plus"
          onPress={toggleModal}
        />
    </Provider>
    )}
    // </View>
//     <AutoDragSortableView
//     dataSource={data}
//     parentWidth={parentWidth}
//     childrenWidth= {childrenWidth}
//     childrenHeight={childrenHeight}
//     keyExtractor={(item,index)=> item.id}
//     renderItem={(item, index, drag) => renderItem({ item, index, drag, isActive: false })}
//     onDragStart={(startIndex,endIndex)=>{
//       console.log(startIndex, endIndex);
//   }}

//   onClickItem={(data)=>{
//     console.log("SUFFER");
// }}

// />




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
    borderColor: 'gray',
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
