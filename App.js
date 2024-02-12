// //FLOATING ACTION BUTTON
import React, { useState, useEffect, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import * as NavigationBar from 'expo-navigation-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
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


// enables edge-to-edge mode
NavigationBar.setPositionAsync('absolute')
// transparent backgrounds to see through
NavigationBar.setBackgroundColorAsync('#ffffff00')

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

  const toggleTheme = React.useCallback(() => {
    setIsThemeDark((prevIsThemeDark) => !prevIsThemeDark);
    saveTheme(!isThemeDark); // Save the theme when toggled
  }, [isThemeDark]);

  const saveTheme = async (isThemeDark) => {
    try {
      await AsyncStorage.setItem('themePreference', JSON.stringify(isThemeDark));
    } catch (error) {
      console.error('Error saving theme preference:', error);
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
      } catch (error) {
        console.error('Error loading theme preference:', error);
      }
    };

    loadTheme();
  }, []);

  const theme = isThemeDark ? CombinedDarkTheme : CombinedDefaultTheme;

  const preferences = React.useMemo(
    () => ({
      toggleTheme,
      isThemeDark,
    }),
    [toggleTheme, isThemeDark]
  );

  
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
