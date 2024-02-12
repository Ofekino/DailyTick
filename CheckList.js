import React, { useState, useRef, useEffect } from 'react';
import { Animated, StyleSheet, View, Text, TouchableOpacity, TextInput, Keyboard, ActivityIndicator } from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';
import { IconButton, FAB, Modal, useTheme, Portal, Icon, Provider, Button, SegmentedButtons } from 'react-native-paper';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { IconPicker } from '@grassper/react-native-icon-picker';
import { differenceInDays } from 'date-fns';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spacer from './Spacer';
import DragList, {DragListRenderItemInfo} from 'react-native-draglist';

  
export default function CheckList() {
  const theme = useTheme();




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
          setData(JSON.parse(savedData));
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

  const taskDate = new Date();

  const [daysNum, setDaysNum] = useState('');

  const handleDaysNum = (text) => {
    // Validate input to ensure it's a positive number
    setDaysNum(text);
    // if (/^\d+$/.test(text)) {
    //   setDaysNum(text);
    // }
  };


  
  const fadeAnim = useRef(new Animated.Value(1)).current;

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
        <View style={{marginTop: 30, marginRight: 30}}>
        <Icon source="trash-can-outline" color={'red'} size={25} />
        </View>
        </TouchableOpacity>
      </View>
    );
  };
const renderItem = ({ item, index, drag, isActive }) => {
  if (
    taskFreq !== 'recurring' ||
    (taskFreq === 'recurring' &&
      (differenceInDays(new Date(), taskDate) === daysNum ||
        differenceInDays(new Date(), taskDate) % daysNum === 0 ||
        differenceInDays(new Date(), taskDate) === 0))
  ) {
  return (
    <Swipeable
      rightThreshold={30}
      leftThreshold={30}
      renderRightActions={(progress, dragX) => renderRightActions(progress, dragX, item, deleteItem)}
    >
      <TouchableOpacity onLongPress={drag}>
        <Animated.View style={{ opacity: item.fadeAnim,}}>
          <View style={[isActive ? styles.activeItem : styles.item, {backgroundColor: theme.colors.surface}]}>
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
                }
              }}
            />
            <View style={{flex: 1}}>

            </View>
            <Icon source={item.icon} color={'blue'} size={25} />
            <Text> </Text>
            <Icon style={{flex: 1, }}
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
      </TouchableOpacity>
    </Swipeable>
  );}
  else {return null;}
          
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


  return (
    <Provider>
      <GestureHandlerRootView style={styles.container}>
        <DraggableFlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          onDragEnd={({ data }) => {
            setData(data);
            console.log("TEST");
          }}
          //activationDistance={50} // Adjust this value according to your preference
        />

        <Portal>
          <Modal visible={isModalVisible} onDismiss={toggleModal} contentContainerStyle={styles.modalContainer}>
            <Text style={styles.modalTitle}>Add New Task</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter task name"
              value={newTask}
              onChangeText={(text) => setNewTask(text)}
            />
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
            {taskFreq === 'recurring' && (
      <View style={{ flexDirection: 'row', alignItems: 'center'}}>
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
        </Portal>

        <FAB
          style={styles.fab}
          mode="elevated" 
          icon="plus"
          onPress={toggleModal}
        />
      </GestureHandlerRootView>
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
    marginHorizontal: 10,
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
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 8,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 8,
  },
});
