//FLOATING ACTION BUTTON
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { AppRegistry } from 'react-native';
import { PaperProvider, MD3LightTheme, MD3DarkTheme, adaptNavigationTheme, useTheme, Appbar, Switch } from 'react-native-paper';
import CheckList from './CheckList';
import MilestoneList from './MilestoneList';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import LottieView from "lottie-react-native";


import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';

import { PreferencesContext } from './PreferencesContext';
import AsyncStorage from '@react-native-async-storage/async-storage';


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

const DrawerContent = ({ navigation }) => {
    const theme = useTheme();
    const { toggleTheme, isThemeDark } = React.useContext(PreferencesContext);
  
  
    const themeAnim = React.useRef(null);
    const isFirstRun = React.useRef(true);
  
    React.useEffect(() => {
      if (isFirstRun.current) {
        if (isThemeDark) 
        {
          themeAnim.current.play(90, 90)
        } 
        else 
        {
          themeAnim.current.play(0, 0)
        }
        isFirstRun.current = false;
      } 
      else if (isThemeDark) 
      {
        themeAnim.current.play(16, 90)
      }
      else 
      {
        themeAnim.current.play(90, 153)
      }
    }, [isThemeDark]);

  return (
    <View style={{ marginTop: 630, marginRight: 200, flex: 1, justifyContent: 'flex-end' }}>
      <TouchableOpacity onPress={toggleTheme}>
        <LottieView
          source={require("./assets/LightToDark.json")}
          style={{ width: 100, height: 100 }}
          autoPlay={false}
          loop={false}
          ref={themeAnim}
        />
      </TouchableOpacity>
    </View>
  );
};

const Drawer = createDrawerNavigator();


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

  return (
    <PreferencesContext.Provider value={preferences}>
      <PaperProvider theme={theme}>
        <NavigationContainer theme={theme}>
        <Drawer.Navigator initialRouteName="Daily Ticks" drawerContent={props => {
    return (
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerContent {...props} />
        </DrawerContentScrollView>
    )
  }}>
        <Drawer.Screen name="Daily Ticks" component={CheckList} />
        {/* <Drawer.Screen name="Milestones" component={MilestoneList} /> */}
        </Drawer.Navigator>
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
