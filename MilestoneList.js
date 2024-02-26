import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Image } from 'react-native';
import {AutoDragSortableView} from 'react-native-drag-sort';


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
    <View style={styles.container}>
        <AutoDragSortableView
    dataSource={AUTO_TEST_DATA}
    parentWidth={parentWidth}
    childrenWidth={childrenWidth}
    childrenHeight={childrenHeight}
    keyExtractor={(item, index) => item.id}
    renderItem={(item, index) => (
        <View style={styles.item}>
            <View style={styles.item_icon_swipe}>
                <Image style={styles.item_icon} source={item.icon}/>
            </View>
            <Text style={styles.item_text}>{item.txt}</Text>
        </View>
    )}
/>
    </View>
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
  
  
  