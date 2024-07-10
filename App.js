
import React, { useCallback, useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import Navbar from './components/navbar';
import BottomBar from './components/bottombar';
import { NavigationContainer } from '@react-navigation/native';
import Home from './components/home';
import { useFonts } from 'expo-font';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Discussion from './components/discussions';
import 'react-native-gesture-handler';
import { render } from 'react-dom';
import Register from './components/register';
import Login from './components/login';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EditProfile from './components/editprofile';
import Status from './components/status';
import { WebSocketProvider } from './components/WebSocketContext';
import { ProfiletProvider } from './components/ProfileContext';
const Stack = createNativeStackNavigator();

export default function App() {

  const [fontsLoaded, fontError] = useFonts({
    'Nexa': require('./assets/fonts/nexa.otf'),
    'NexaBold': require('./assets/fonts/nexabold.otf'),

  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
    }
  }, [fontsLoaded, fontError]);
  if (!fontsLoaded && !fontError) {
    return null;
  }

      return (
        <WebSocketProvider>
          <ProfiletProvider>
          <NavigationContainer onLayout={onLayoutRootView}>
            <Stack.Navigator>
              <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
              <Stack.Screen name="Register" component={Register} options={{ headerShown: false }}/>
              <Stack.Screen name="BottomBar" component={BottomBar} options={{ headerShown: false }}/>
              <Stack.Screen name="Status" component={Status} options={{ headerShown: false }}/>
              <Stack.Screen name="EditProfile" component={EditProfile} options={{
                        title: 'Editer mon Profil' ,            headerStyle: {
                          backgroundColor: '#FF4D71',          headerTintColor: 'white',
                          headerTitleStyle: {
                            fontWeight: 'bold',
                            fontFamily: 'NexaBold',
                            textColor: 'white'
                          },
                        }, }} />
                <Stack.Screen name="Discussion" component={Discussion} options={{
                  title: 'Discussion',
                  headerStyle: {
                    backgroundColor: '#FF4D71',
                  },
                  headerShown: false,
                  headerTintColor: '#fff',
                  headerTitleStyle: {
                    fontWeight: 'bold',
                    fontFamily: 'NexaBold'
                  },
                }} />
            </Stack.Navigator>
          </NavigationContainer>    
          </ProfiletProvider>
        </WebSocketProvider>
    );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    height: '100%',
    backgroundColor: '#FF4D71',
  },
});
