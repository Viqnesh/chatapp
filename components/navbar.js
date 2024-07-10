import React from 'react';
import { StyleSheet, Text, View , TouchableHighlight, Image, Pressable } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'; 
import BottomBar from './bottombar';
import logo from '../assets/logo.png'; // Tell webpack this JS file uses this image
import ham from '../assets/ham.png'; // Tell webpack this JS file uses this image
import AsyncStorage from '@react-native-async-storage/async-storage';
import Login from './login';

function Navbar() {
    // Pour supprimer une donnée
    const removeData = async () => {
      try {
        const login =  await AsyncStorage.getItem('login');
        console.log(login);
        await AsyncStorage.removeItem('login');
        await AsyncStorage.setItem('isLogged', false);

        console.log('Donnée supprimée avec succès !');
      } catch (e) {
        console.error('Erreur lors de la suppression de la donnée :', e);
      }
    };
    return (
            <View style={styles.container}>

            <Image
              source={logo}
              style={styles.logo}
              resizeMode='contain'
            />
          </View>

      );
    };
    
    const styles = StyleSheet.create({
      container: {
        flexDirection: 'row',
        width: '100%',
        height: '14%',
        alignItems: 'center',
        backgroundColor: '#FF4D71',
      },

      logo: {
        width: 190, // ajustez la largeur comme nécessaire
        height: 80, // ajustez la hauteur comme nécessaire
        marginLeft: 100,
        marginRight: 'auto',
        marginTop: 'auto'
      },
      ham: {
        width: 20, // ajustez la largeur comme nécessaire
        height: 80, // ajustez la hauteur comme nécessaire
        marginRight: 25,
        tintColor: 'white',
        marginTop: 'auto'

      }
    });
  export default Navbar;