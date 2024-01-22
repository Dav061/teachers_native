import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from './components/main';
import teacherDetailsScreen from './components/TeacherDetailsScreen';
import { LogBox } from 'react-native';
LogBox.ignoreAllLogs();
const Stack = createStackNavigator();

function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MainScreen">
        <Stack.Screen name="MainScreen" component={MainScreen} teachers={{ headerShown: false }} />
        <Stack.Screen name="TeacherDetailsScreen" component={teacherDetailsScreen} teachers={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;