import React, { useState, useRef, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TouchableWithoutFeedback, SafeAreaView} from 'react-native';
import LottieView from "lottie-react-native";
import { PaperProvider, MD3LightTheme, MD3DarkTheme, adaptNavigationTheme, useTheme, List, SegmentedButtons, Button, Icon} from 'react-native-paper';
import { PreferencesContext } from './PreferencesContext';
import DateTimePicker from '@react-native-community/datetimepicker';
import { differenceInDays } from 'date-fns';

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
              <TouchableWithoutFeedback onPress={toggleTheme}>
                <LottieView
                  source={require("./assets/LightToDark.json")}
                  style={{ width: 100, height: 100, position: 'relative'}}
                  autoPlay={false}
                  loop={false}
                  ref={themeAnim}
                />
              </TouchableWithoutFeedback>
          );
        };

        const StreakSetting = () => {

          const theme = useTheme();

          const [showDatePicker, setShowDatePicker] = useState(false);


  const { currentStreakDate, toggleCurrentStreakDate } = React.useContext(PreferencesContext);

  const { currentStreakNum, toggleCurrentStreakNum } = React.useContext(PreferencesContext);
    
  const { actualStreakDate, toggleActualStreakDate } = React.useContext(PreferencesContext);

  const onChange = (event, selectedDate) => {
    // const currentCurrentStreakDate = selectedDate;
    setShowDatePicker(false);
    toggleActualStreakDate(selectedDate);
    toggleCurrentStreakDate(selectedDate);
    toggleCurrentStreakNum(differenceInDays(new Date(), selectedDate));
  };

        return (
          <SafeAreaView>
            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
            <View style={{flexDirection: 'row', marginTop: 1.5}}>
                <Text style={{ color: theme.colors.text, fontSize: 15 }}>
                  {actualStreakDate.getTime() === 0 ? new Date().toLocaleDateString() : actualStreakDate.toLocaleDateString()}
                </Text>        
      <View style={{marginLeft: 10}}>
        <Icon source="pencil" color={'#4287f5'} size={25} />
        </View>
        </View>
        </TouchableOpacity>        

        {showDatePicker && (
            <DateTimePicker
              testID="dateTimePicker"
              value={actualStreakDate}
              mode={'date'}
              is24Hour={true}
              onChange={onChange}
            />
          )}
          </SafeAreaView>
          );
        };
        
    const FrequencySetting = () => {

      const { notiFreq, toggleNotiFreq } = React.useContext(PreferencesContext);

      return (
        <SegmentedButtons
        value={notiFreq}
        onValueChange={(value) => toggleNotiFreq(value)}  // Pass the changed value to toggleNotiFreq
        buttons={[
          {
            value: 'disabled',
            label: 'Disabled',
            showSelectedCheck: true,
          },
          {
            value: 'daily',
            label: 'Daily',
            showSelectedCheck: true,
          },
          {
            value: 'weekly',
            label: 'Weekly',
            showSelectedCheck: true,
          },
        ]}
      />
        );
      };

      const NotiTimeSetting = () => {

        const theme = useTheme();


        const [showTimePicker, setShowTimePicker] = useState(false);
        const { notiTime, toggleNotiTime } = React.useContext(PreferencesContext);

        const onChange = (event, selectedDate) => {
          const currentNotiTime = selectedDate;
          setShowTimePicker(false);
          toggleNotiTime(currentNotiTime);
        };

        
        return (
          <SafeAreaView>
            <TouchableOpacity onPress={() => setShowTimePicker(true)}>
            <View style={{flexDirection: 'row', marginTop: 1.5}}>
            <Text style={{color: theme.colors.text, fontSize: 15}}>{notiTime.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}</Text>
        <View style={{marginLeft: 10}}>
        <Icon source="pencil" color={'#4287f5'} size={25} />
        </View>
        </View>
        </TouchableOpacity>        

        {showTimePicker && (
            <DateTimePicker
              testID="dateTimePicker"
              value={notiTime}
              mode={'time'}
              is24Hour={true}
              onChange={onChange}
            />
          )}
          </SafeAreaView>
          );
        };
    
    
      return (
        <List.Section style={{ marginLeft: 20, marginTop: 50 }}>
          <List.Subheader>General</List.Subheader>
          <List.Item
          style={{marginBottom: -40, marginTop: -40}}
            title="Theme:"
            right={() => <ThemeSetting />}
          />
          <List.Item
            title="Set streak start:"
            right={() => <StreakSetting />}
            />
          <List.Subheader style={{marginTop: 40 }}>Notifications</List.Subheader>
          <List.Item
            title="Notification Frequency:"
            titleStyle={{marginBottom: 20}}
            description={() => <FrequencySetting />}
          />
          <List.Item
            title="Notification Time:"
            titleStyle={{marginBottom: 20}}
            right={() => <NotiTimeSetting />}
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
  });
  
  
  