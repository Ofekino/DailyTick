import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Image } from 'react-native';
import {AutoDragSortableView} from 'react-native-drag-sort';
import { List, Button } from 'react-native-paper';

const {width} = Dimensions.get('window')

const parentWidth = width
const childrenWidth = width - 20
const childrenHeight = 48



export default function MilestoneList() {


  AUTO_TEST_DATA = [
    {icon: require('./assets/icon.png'),txt: 1},
    {icon: require('./assets/icon.png'),txt: 2},
]

    


  return (
    <List.Section style={{marginLeft: 20, marginTop: 50}}>
    <List.Subheader>Some title</List.Subheader>
    <List.Item title="First Item" left={() => <List.Icon icon="folder" />} />
    <List.Item
      title="Second Item"
      right={() => <Button mode="contained" style={{ marginHorizontal: 8 }}>Select Icon</Button>}
    />
  </List.Section>
  );
}



const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
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
  
  
  