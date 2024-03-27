// //FLOATING ACTION BUTTON
import React, { useState, useEffect, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import * as NavigationBar from 'expo-navigation-bar';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Image } from 'react-native';
import { PaperProvider, MD3LightTheme, MD3DarkTheme, adaptNavigationTheme, useTheme, Appbar, Switch } from 'react-native-paper';
import CheckList from './CheckList';
import MilestoneList from './MilestoneList';
import Settings from './Settings';
import { PreferencesContext } from './PreferencesContext';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Ionicons from '@expo/vector-icons/Ionicons';

import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import {AutoDragSortableView} from 'react-native-drag-sort';


if (Platform.OS === 'android') {
  // enables edge-to-edge mode
  NavigationBar.setPositionAsync('absolute');
  // transparent backgrounds to see through
  NavigationBar.setBackgroundColorAsync('#ffffff00');
}

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

const CombinedDefaultTheme = {
  ...MD3LightTheme,
  ...LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    ...LightTheme.colors,
  },
};
const CombinedDarkTheme = {
  ...MD3DarkTheme,
  ...DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    ...DarkTheme.colors,
  },
};


export default function App() {


  const [isThemeDark, setIsThemeDark] = React.useState(false);

  const [notiFreq, setNotiFreq] = React.useState('disabled');

  const [notiTime, setNotiTime] = React.useState(new Date(1710748800000));

  const [currentStreakDate, setCurrentStreakDate] = React.useState(new Date(0));

  const [currentStreakNum, setCurrentStreakNum] = React.useState(0);

  const [actualStreakDate, setActualStreakDate] = React.useState(new Date(0));

  const toggleTheme = React.useCallback(() => {
    setIsThemeDark((prevIsThemeDark) => !prevIsThemeDark);
    saveTheme(!isThemeDark); // Save the theme when toggled
  }, [isThemeDark]);

  const toggleNotiFreq = React.useCallback((newNotiFreq) => {
    setNotiFreq(newNotiFreq);
    saveNotiFreq(newNotiFreq);
  }, [setNotiFreq]);

  const toggleNotiTime = React.useCallback((newNotiTime) => {
    setNotiTime(newNotiTime);
    saveNotiTime(newNotiTime);
  }, [setNotiTime]);


  const toggleCurrentStreakDate = React.useCallback((newCurrentStreakDate) => {
    setCurrentStreakDate(newCurrentStreakDate);
    saveCurrentStreakDate(newCurrentStreakDate);
  }, [setCurrentStreakDate]);

  const toggleCurrentStreakNum = React.useCallback((newCurrentStreakNum) => {
    setCurrentStreakNum(newCurrentStreakNum);
    saveCurrentStreakNum(newCurrentStreakNum);
  }, [setCurrentStreakNum]);

  const toggleActualStreakDate = React.useCallback((newActualStreakDate) => {
    setActualStreakDate(newActualStreakDate);
    saveActualStreakDate(newActualStreakDate);
  }, [setActualStreakDate]);

  
  const saveTheme = async (isThemeDark) => {
    try {
      await AsyncStorage.setItem('themePreference', JSON.stringify(isThemeDark));
    } catch (error) {
      console.error('Error saving theme preference:', error);
    }
  };

  const saveNotiFreq = async (notiFreq) => {
    try {
      await AsyncStorage.setItem('notiFreq', JSON.stringify(notiFreq));
    } catch (error) {
      console.error('Error saving notiFreq preference:', error);
    }
  };

  const saveNotiTime = async (notiTime) => {
    try {
      await AsyncStorage.setItem('notiTime', JSON.stringify(notiTime));
    } catch (error) {
      console.error('Error saving notiTime preference:', error);
    }
  };

  const saveCurrentStreakDate = async (currentStreakDate) => {
    try {
      await AsyncStorage.setItem('currentStreakDate', JSON.stringify(currentStreakDate));
    } catch (error) {
      console.error('Error saving currentStreakDate preference:', error);
    }
  };

  const saveCurrentStreakNum = async (currentStreakNum) => {
    try {
      await AsyncStorage.setItem('currentStreakNum', JSON.stringify(currentStreakNum));
    } catch (error) {
      console.error('Error saving currentStreakNum preference:', error);
    }
  };

  const saveActualStreakDate = async (actualStreakDate) => {
    try {
      await AsyncStorage.setItem('actualStreakDate', JSON.stringify(actualStreakDate));
    } catch (error) {
      console.error('Error saving actualStreakDate preference:', error);
    }
  };


  // Load theme preference when the component mounts
  React.useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('themePreference');
        if (savedTheme !== null) {
          setIsThemeDark(JSON.parse(savedTheme));
        }

        const savedNotiFreq = await AsyncStorage.getItem('notiFreq');
        if (savedNotiFreq !== null) {
                  setNotiFreq(JSON.parse(savedNotiFreq));
        }

        const savedNotiTime = await AsyncStorage.getItem('notiTime');
        if (savedNotiTime !== null) {
                  setNotiTime(new Date(JSON.parse(savedNotiTime)));
        }

        const savedCurrentStreakDate = await AsyncStorage.getItem('currentStreakDate');
        if (savedCurrentStreakDate !== null) {
                  setCurrentStreakDate(new Date(JSON.parse(savedCurrentStreakDate)));
        }

        const savedCurrentStreakNum = await AsyncStorage.getItem('currentStreakNum');
        if (savedCurrentStreakNum !== null) {
                  setCurrentStreakNum(JSON.parse(savedCurrentStreakNum));
        }

        const savedActualStreakDate = await AsyncStorage.getItem('actualStreakDate');
        if (savedActualStreakDate !== null) {
                  setActualStreakDate(new Date(JSON.parse(savedActualStreakDate)));
        }

      } catch (error) {
        console.error('Error loading theme preference:', error);
      }
    };

    loadTheme();
  }, []);

    // Load theme preference when the component mounts
    // React.useEffect(() => {
    //   const loadNotiFreq = async () => {
    //     try {
    //       const savedNotiFreq = await AsyncStorage.getItem('notiFreq');
    //       if (savedNotiFreq !== null) {
    //         setNotiFreq(JSON.parse(savedNotiFreq));
    //       }
    //     } catch (error) {
    //       console.error('Error loading theme preference:', error);
    //     }
    //   };
  
    //   loadNotiFreq();
    // }, []);

  const theme = isThemeDark ? CombinedDarkTheme : CombinedDefaultTheme;


  const preferences = React.useMemo(
    () => ({
      toggleTheme,
      isThemeDark,
      notiFreq,
      toggleNotiFreq,
      notiTime,
      toggleNotiTime,
      currentStreakDate,
      toggleCurrentStreakDate,
      currentStreakNum,
      toggleCurrentStreakNum,
      actualStreakDate,
      toggleActualStreakDate
    }),
    [toggleTheme, isThemeDark, notiFreq, toggleNotiFreq, notiTime, toggleNotiTime, currentStreakDate, toggleCurrentStreakDate, currentStreakNum, toggleCurrentStreakNum, actualStreakDate, toggleActualStreakDate]);
  

  
  const Tab = createBottomTabNavigator();



  return (
    <PreferencesContext.Provider value={preferences}>
      <PaperProvider theme={theme}>
        <NavigationContainer theme={theme}>
          <Tab.Navigator 
            screenOptions={({ route }) => ({
              headerShown: false,
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === 'Ticks') {
                  iconName = focused ? 'checkbox' : 'checkbox-outline';
                } 
                else if (route.name === 'Milestones') {
                  iconName = focused ? 'star' : 'star-outline';
                }
                else if (route.name === 'Settings') {
                  iconName = focused ? 'cog' : 'cog-outline';
                }


                return <Ionicons name={iconName} size={size} color={color}></Ionicons>;
              },
              tabBarActiveTintColor: 'tomato',
              tabBarInactiveTintColor: 'gray',
            })}
          >
            <Tab.Screen name="Ticks" component={gestureHandlerRootHOC(CheckList)}/>
            <Tab.Screen name="Milestones" component={MilestoneList}/>
            <Tab.Screen name="Settings" component={Settings}/>
          </Tab.Navigator>
          <StatusBar translucent/>
        </NavigationContainer>
      </PaperProvider>
    </PreferencesContext.Provider>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});






