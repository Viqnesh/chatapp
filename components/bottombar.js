import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View ,Button, TouchableHighlight, Image,Alert } from 'react-native';

import logo from '../assets/logo.png'; // Tell webpack this JS file uses this image
import ham from '../assets/ham.png'; // Tell webpack this JS file uses this image
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Chat from './salonpublic';
import Home from './home';
import Statut from './status' ;
import Search from './search' ;
const Tab = createBottomTabNavigator();
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons'; 
import { Octicons } from '@expo/vector-icons';
import Navbar from './navbar';
import Logout from './logout';
import Login from './login';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useWebSocket } from './WebSocketContext';
function Clearlog({navigation}) {
  const { socket, dendams, setDendams } = useWebSocket();
  const updateStatut = async () => {
    try {
      const fetchedData = await AsyncStorage.getItem('fetchedData');
      const userId = fetchedData;
      const foundUser = dendams.find((dendam) => dendam.userId === parseInt(userId));
      foundUser.status = "HL"; 
      const response = await fetch('http://localhost:3000/status/' + userId, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ statut: 'HL'})
      }
      );
  
      if (response.ok) {
        console.log('User data updated successfully');
            if (socket) {
              socket.send(
                JSON.stringify({
                  type: 'closeUser',
                  roomId: 1,
                  messageText: 'Close User Session',
                  userId: foundUser.userId,
                  username: foundUser.username
                })
              );
            }
          else {
              console.log('Socket is null');
          }
      }
      else {
          console.error('Failed to update user data:', response.statusText);
      }
      
    } 
    catch (error) {
      console.error('Error fetching or storing data:', error);
    }
  };
  updateStatut();
  AsyncStorage.clear(); // to clear the token 
  return navigation.navigate('Login');
}


function BottomBar() {
  const [dendams, setDendams] = useState();
    return (<View style={styles.container}>
        <Navbar/>

      <Tab.Navigator screenOptions={{ tabBarLabelStyle: {fontFamily: 'NexaBold'}, tabBarStyle: { backgroundColor: '#FF4D71', marginBottom: 10, position: 'absolute' , top:0,height:60,paddingBottom:10,border:0, //Specify the height of your custom header

         elevation: 0, // remove shadow on Android
          shadowOpacity: 0}, headerShown: false ,showicon: false, tabBarActiveTintColor: 'lightgreen',
    tabBarInactiveTintColor: 'white',}}>
        <Tab.Screen name="Chat"  component={Chat}         options={{
          tabBarLabel: 'Salon',
          tabBarIcon: ({ color, size }) => (
            <Octicons name="comment-discussion" size={24}  color='white'/>           ),
        }}/>
        <Tab.Screen name="Statut" component={Statut} options={{
          tabBarLabel: 'Compte',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="user-circle" size={24}   color='white'/>          ),
        }} />
        <Tab.Screen name="Search" component={Search} options={{
          tabBarLabel: 'Dendams',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5  name="search" size={24}  color='white'/>          ),
        }} />
        <Tab.Screen name="Logout" component={Clearlog} options={{
          tabBarLabel: 'Deconnexion',
          tabBarIcon: ({ color, size }) => (
            <Octicons name="sign-out" size={24}  color='white'/>          ),
        }} />
      </Tab.Navigator>
        </View>

    );
  }
    
    const styles = StyleSheet.create({
      container: {
        height: '100%',
        fontFamily: 'Nexa',
      },

      logo: {
        width: 190, // ajustez la largeur comme nécessaire
        height: 80, // ajustez la hauteur comme nécessaire
        marginLeft: 'auto',
        marginRight: 'auto'
        
      }
    });
  export default BottomBar;