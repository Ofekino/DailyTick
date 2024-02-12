import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import LottieView from "lottie-react-native";
import { PaperProvider, MD3LightTheme, MD3DarkTheme, adaptNavigationTheme, useTheme, Appbar, Switch } from 'react-native-paper';
import { PreferencesContext } from './PreferencesContext';


export default function Settings() {


    const ThemeSetting = () => {
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
            themeAnim.current.play(95, 153)
          }
        }, [isThemeDark]);
    
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{fontFamily: "sans-serif-light", color: theme.colors.text}}>Theme: </Text>
              <TouchableWithoutFeedback onPress={toggleTheme}>
                <LottieView
                  source={require("./assets/LightToDark.json")}
                  style={{ width: 100, height: 100 }}
                  autoPlay={false}
                  loop={false}
                  ref={themeAnim}
                />
              </TouchableWithoutFeedback>
            </View>
          );
        };
    
    
  return (
    <View style={styles.container}>
        <ThemeSetting/>
    </View>
  );
}



const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  
  
  