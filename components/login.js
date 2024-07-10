import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View , TextInput, TouchableHighlight, Image, FlatList, Pressable, Alert } from 'react-native';

import logo from '../assets/logo.png'; // Tell webpack this JS file uses this image
import leo from '../assets/marsh.jpg';
import ham from '../assets/ham.png'; // Tell webpack this JS file uses this image
import Navbar from './navbar';
import { Avatar } from 'react-native-paper';
import add from '../assets/add.png';
import { IconButton, MD3Colors } from 'react-native-paper';
import { FontAwesome5 } from '@expo/vector-icons'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomBar from './bottombar';




function Login({ route, navigation, testId }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
// Pour sauvegarder une donnée

const login = async () => {
  const userData = {
    username: username,
    password: password,
  };

  try {
    const response = await fetch('http://localhost:3000/checklogin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (response.ok) {
      const responseData = await response.json();
      const token = responseData.token;
      console.log('Token JWT reçu :', token);
      await AsyncStorage.setItem(
        'token',
        token,
      );
      navigation.navigate('BottomBar')      // Stockez le token dans le stockage local ou dans le state de votre application React Native
    } 
    else {
      const errorData = await response.json();
      console.error('Erreur lors de la connexion :', errorData.error);
      Alert.alert('Erreur de Connexion', 'Votre identifiant ou votre mot de passe est incorrect', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ])
    }
  } 
  catch (error) {
    console.error('Erreur lors de la connexion :', error);
    Alert.alert('Erreur de Connexion', 'Votre identifiant ou votre mot de passe est incorrect', [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ])
  }
};
    
      return (<View style={styles.container}>
        <Image source={logo} style={styles.logo} />
        <Text style={styles.title}>Login</Text>
        <Text style={styles.subtitle}>Connectez-vous pour acceder a votre espace</Text>

        <View>
        <TextInput style={styles.input} placeholder='Username' onChangeText={setUsername} value={username}/>    
                <TextInput style={styles.input} placeholder='Mot de passe' onChangeText={setPassword} value={password}/>    
    <Text onPress={login} style={styles.btnSend}> CONNEXION </Text>
        </View>

        <View style={styles.inscri}>
          <Text style={styles.signup}>Vous n'avez pas encore de compte ?</Text>
          <Text style={styles.btnIns} onPress={() => navigation.navigate('Register')}> INSCRIPTION </Text>

        </View>
  </View>

      );

  }
    
    const styles = StyleSheet.create({
      container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#FF4D71',

      },
      signup: {
        color:'white',
        fontSize: 15,
        fontWeight: 'bold',
        marginLeft: 'auto',
        marginRight: 'auto' 
      },
      inscri: {
        marginTop: 'auto',
        marginBottom: 'auto'
      },
      flaaat: {
        marginTop:68
      },
      btnSend: {
        backgroundColor: 'lightblue',
        padding: 15,
        borderRadius: 20,
        marginLeft: 'auto',
        marginRight: 50,
        marginTop: 28,
        color: 'white',
        fontFamily: 'NexaBold',
        shadowColor: 'black',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
      },
      btnIns: {
        backgroundColor: 'lightblue',
        padding: 15,
        borderRadius: 20,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 28,
        color: 'white',
        fontFamily: 'NexaBold',
        shadowColor: 'black',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
      },
      logo: {
        marginTop: '15%',
        width: 280, // ajustez la largeur comme nécessaire
        height: 100, // ajustez la hauteur comme nécessaire
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
        fontSize: 35,
        fontFamily: 'NexaBold', color:'white',
        marginLeft: 25,
        marginTop: 25,
      },
      
      subtitle: {
        fontSize: 15,
        marginLeft: 25,
        marginBottom: 8,
        marginTop: 5,
        color: 'white',
        fontFamily: 'Nexa',
      },
      date: {
        marginLeft: 'auto',
        marginBottom: 'auto',
        fontFamily: 'NexaBold',
      },
      input: {
        height: 50,
        width: '80%',
        borderRadius: 8,
        borderWidth: 1,
        marginLeft: 25,
        marginTop: 25,
        borderColor: 'lightgrey',
        backgroundColor: 'white',
        fontFamily: 'Nexa',
        padding: 10,
        shadowColor: 'black',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        color: 'lightgrey'
      },
    });
  export default Login ;