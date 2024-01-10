import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { AppRegistry } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import CheckList from './CheckList';

export default function App() {
  return (
    <PaperProvider>
    <View style={styles.container}>
      <CheckList label="Sleep" icon="power-sleep"/>
      <StatusBar style="auto" />
    </View>
    </PaperProvider>
  );
}

AppRegistry.registerComponent("DailyTick", () => Main);



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
