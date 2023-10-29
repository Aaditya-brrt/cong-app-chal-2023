import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView, Text, Pressable, LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications
import Home from './components/home';
import Player from './components/player';
import ScorePage from './components/scorePage';
import SearchResults from './components/searchResults';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { DifficultyProvider } from './components/difficultyContext';

export default function App() {
  const Stack = createStackNavigator();
  return (
    <DifficultyProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Home'>
          <Stack.Screen name = "Home" component={Home} options = {{headerShown: false}}/>
          <Stack.Screen name = "Search Results" component={SearchResults}/>
          <Stack.Screen name = "Player" component={Player} options = {{headerShown: false}}/>
          <Stack.Screen name = "Results" component={ScorePage} options = {{headerShown: true}}/>

        </Stack.Navigator>
        </NavigationContainer>
    </DifficultyProvider>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
