import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View , TouchableHighlight, Image, FlatList } from 'react-native';

import logo from '../assets/logo.png'; // Tell webpack this JS file uses this image
import leo from '../assets/marsh.jpg';
import ham from '../assets/ham.png'; // Tell webpack this JS file uses this image
import Navbar from './navbar';
import { Avatar } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import BottomBar from './bottombar';
import { Octicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Login from './login';
function Home({ navigation }) {
  
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [value, setValue] = useState('');
  const [thread , setThread] = useState([]);

  console.log(isLoggedIn);
  const DATA = [
    {
      id: '1',
      title: 'Salon Public',
      lastMsg: 'Lorem ipsum dolor sit ame',
      etat: 'dispo'
    },
    {
      id: '2',
      title: 'Baalane',
      lastMsg: 'Lorem ipsum dolor sit ame',
      etat: 'absent'
    },
    {
      id: '3',
      title: '06 46 43 73 55',
      lastMsg: 'Lorem ipsum dolor sit ame',
      etat: 'occupe'
    },
    {
      id: '4',
      title: 'Akatsuki Indien',
      lastMsg: 'Lorem ipsum dolor sit ame',
      etat: 'dispo'
    },
    {
      id: '5',
      title: 'Bale Bale family',
      lastMsg: 'Lorem ipsum dolor sit ame',
      etat: 'absent'
    },
    {
      id: '6',
      title: 'Third Item',
      lastMsg: 'Lorem ipsum dolor sit ame',
      etat: 'occupe'
    },
    {
      id: '7',
      title: 'Second Item',
      lastMsg: 'Lorem ipsum dolor sit ame',
      etat: 'dispo'
    },
  ];
  function checkIcon(iconAva) {
    if (iconAva == 'dispo') {
      return <Octicons name='check-circle-fill' size={14}  color='lightgreen' style={styles.icon}/>
    } 
    else {
      if (iconAva == 'absent') {
        return  <Octicons name='x-circle-fill' size={14}  color='red' style={styles.icon}/>
      }
      return <Octicons name='no-entry' size={14}  color='yellow' style={styles.icon}/>
    }
  }
  const Item = ({id, title, lastMsg, etat }) => (
     

      <TouchableHighlight onPress={() => navigation.navigate('Discussion' , {
        params: { title: title, testId: id },           options: { headerShown: false }
      }
      )}>
      <View style={styles.item}>
        <Avatar.Image size={60} source={leo} style={styles.avatar} resizeMode='contain'/>
        <View>
        <Text style={styles.title}>{title} {checkIcon(etat)}  </Text>
        <Text style={styles.subtitle}>{lastMsg}</Text>
        </View>
        <Text style={styles.date}>13:30</Text>
      </View>
      </TouchableHighlight>
  );


  const checkLogin = useCallback(async () => {
      const valueL = await AsyncStorage.getItem('isLogged');
      setValue(valueL);
      if (valueL === false) {
        this.props.navigation.navigate('Login')
      }
  });







  return (<View style={styles.container}>
        <FlatList
          style={styles.flaaat}
          data={DATA}
          renderItem={({item}) => <Item id={item.id} title={item.title} lastMsg={item.lastMsg} etat={item.etat} />}
          keyExtractor={item => item.id}
        />
        </View>
  
      );
    } 
    
    const styles = StyleSheet.create({
      container: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white'
      },
      flaaat: {
        marginTop:55
      },
      logo: {
        width: 190, // ajustez la largeur comme nécessaire
        height: 80, // ajustez la hauteur comme nécessaire
        marginLeft: 'auto',
        marginRight: 'auto'
      },
      item: {
        backgroundColor: 'white',
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: 'lightgrey',
        borderBottomWidth: 1
      },
      title: {
        fontSize: 15,
        fontFamily: 'NexaBold',        marginLeft: 15,
        marginBottom: 3,
      },
      subtitle: {
        fontSize: 15,
        marginLeft: 15,
        color: 'black',
        marginBottom: 3,
        fontFamily: 'Nexa',
      },
      date: {
        marginLeft: 'auto',
        marginBottom: 'auto',
        fontFamily: 'NexaBold',
      },
      avatar: {
      }
    });
  export default Home ;