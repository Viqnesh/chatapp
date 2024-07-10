import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View , TextInput, TouchableHighlight, Image, FlatList, ScrollView, ImageBackground, Button, Pressable,Alert } from 'react-native';

import logo from '../assets/logo.png'; // Tell webpack this JS file uses this image
import ham from '../assets/ham.png'; // Tell webpack this JS file uses this image
import Navbar from './navbar';
import map from '../assets/pin.png'; // Tell webpack this JS file uses this image
import phone from '../assets/phone.webp'; // Tell webpack this JS file uses this image

import leo from '../assets/marsh.jpg';
import wall from '../assets/leaf.jpg';
import { Avatar } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons'; 
import { Octicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { parse } from 'react-native-svg';
import { useProfileContext } from './ProfileContext';

function EditProfile({navigation}) {
    const [username, setUsername] = useState(''); // State to store the retrieved data
    const [password, setPassword] = useState(''); // State to store the retrieved data
    const [mail, setMail] = useState(''); // State to store the retrieved data
    const [phone, setPhone] = useState(''); // State to store the retrieved data
    const [steam, setSteam] = useState(''); // State to store the retrieved data
    const [xbox, setXbox] = useState(''); // State to store the retrieved data
    const [twitter, setTwitter] = useState(''); // State to store the retrieved data
    const [instagram, setInstagram] = useState(''); // State to store the retrieved data
    const [data, setData] = useState(null); // State to store the retrieved data
    const {profileData , setProfileData} = useProfileContext();
    console.log(profileData);
    useEffect(() => {
    const decodeTok = async () => {
      try {
        setData(profileData);
        console.log(data);
        setUsername(profileData.username);
        setMail(profileData.mail);
        setPhone(profileData.phone);
        setInstagram(profileData.instagram);
        setTwitter(profileData.twitter);
        setXbox(profileData.gamertag);
        setSteam(profileData.steam);
      }
      catch (error) {
        console.error('Error fetching or storing data:', error);
      }
    }
    decodeTok();
  }, []); // Empty dependency array ensures this effect runs only once (on mount)

  const updateStatut = async () => {
    try {
      const userId = data.userId;
      const userData = { username : username , mail : mail , phone : phone , instagram : instagram , gamertag : xbox , steam: steam , twitter : twitter }
      const response = await fetch('http://localhost:3000/user/' + userId, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
      }
      );
  
      if (response.ok) {
        console.log('User data updated successfully');
        setProfileData(userData);
        await AsyncStorage.setItem('fetchedData', JSON.stringify(userData));
        console.log('Data stored successfully:', userData);
        Alert.alert('Enregistrement', 'Vos modifications on été enregistrés', [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ])
        navigation.navigate('BottomBar');
      } else {
        console.error('Failed to update user data:', response.statusText);
      }
    } 
    
    catch (error) {
      console.error('Error fetching or storing data:', error);
    }
  };
    return (
        <ScrollView style={styles.container} >

            <View>
            <Text style={styles.label}><FontAwesome5 name="user" size={14}  color='black'/> Login  </Text>
            <TextInput style={styles.input} value={username} onChangeText={(username) => setUsername(username)} />
            </View>

            <View>
            <Text style={styles.label}> <FontAwesome5 name="key" size={14}  color='black'/> Mot de passe  </Text>
            <TextInput style={styles.input} value={password} onChangeText={(password) => setPassword(password)} />
            </View>

            <View>
            <Text style={styles.label}> <FontAwesome5 name="at" size={14}  color='black'/> Adresse mail  </Text>
            <TextInput style={styles.input} value={mail} onChangeText={(mail) => setMail(mail)} />
            </View>

            <View>
            <Text style={styles.label}> <FontAwesome5 name="phone" size={14}  color='black'/> Numero de telephone </Text>
            <TextInput style={styles.input} value={phone} onChangeText={(phone) => setPhone(phone)} />
            </View>

            <View>
            <Text style={styles.label}> <FontAwesome5 name="xbox" size={14}  color='black'/> Gamertag Xbox </Text>
            <TextInput style={styles.input} value={xbox} onChangeText={(xbox) => setXbox(xbox)} />
            </View>
            <View>
            <Text style={styles.label}> <FontAwesome5 name="steam" size={14}  color='black'/> Steam ID </Text>
            <TextInput style={styles.input} value={steam} onChangeText={(steam) => setSteam(steam)} />
            </View>
            <View>
            <Text style={styles.label}> <FontAwesome5 name="twitter" size={14}  color='black'/> Twitter </Text>
            <TextInput style={styles.input} value={twitter} onChangeText={(twitter) => setTwitter(twitter)} />
            </View>

            <View>
            <Text style={styles.label}> <FontAwesome5 name="instagram" size={14}  color='black'/> Instagram </Text>
            <TextInput style={styles.input} value={instagram} onChangeText={(instagram) => setInstagram(instagram)} />
            </View>

            <View style={styles.viewbtn}>
            <Pressable style={styles.btnSend} onPress={updateStatut}><Text style={styles.btnText} >Sauvegarder</Text></Pressable>
            </View>
        </ScrollView>

    );
  }
    
    const styles = StyleSheet.create({
      container: {
        width: '100%',
        height: '100%',

      },
      viewbtn: {
        marginBottom: 30
      },
      label: {
        fontSize: 15,
        fontFamily: 'Nexa',
        marginBottom: 8,
        alignItems: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '84%',
        marginTop: 25
      },
      input: {
        height: 45,
        width: '84%',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'lightgrey',
        backgroundColor: 'white',
        fontFamily: 'Nexa',
        padding: 10,
        color: 'lightgrey',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: '5px'      
      },
      btnText: {
        fontFamily: 'NexaBold',
        color: 'white'
      },
      socials: {
        flexDirection: 'column',
        paddingBottom: 30,
        paddingTop:10,
        paddingRight: 30,
        paddingLeft: 35,
        marginTop:10


      },
      btnSend: {
        backgroundColor: 'lightgreen',
        padding: 15,
        borderRadius: 20,
        marginLeft: 'auto',
        marginRight: 20,
        marginTop: 50,
        fontFamily: 'NexaBold',
        color: 'white'
      },
      socialText:  {
        marginLeft: 'auto',
        fontFamily: 'Nexa',
        marginRight: 10,
        marginBottom: 'auto',
        marginTop: 'auto'
      },
      socialOng: {
        backgroundColor: 'beige',
        padding: 15,
        borderRadius: 5,
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        marginRight: 25,
        shadowColor: 'black',
        marginBottom: 20,
        elevation: 5,
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
      },
      pin: {
        flexDirection: 'row',
        paddingBottom: 30,
        paddingTop:10,
        paddingRight: 30,
        paddingLeft: 35,
        marginTop:10

      },
      pinText: {
        marginTop: 'auto',
        fontFamily: 'Nexa',
        fontSize: 15,
        margin: 15
      },
      icon: {
        position: 'absolute',
        top: -25, // Déplace l'icône vers le haut
        left: -25, // Déplace l'icône vers la gauche
      },
      socialIcon: {
        marginRight: 'auto',
        marginLeft: 10,

      },
      iconPin: {
        position: 'absolute',
        top: -20, // Déplace l'icône vers le haut
        left: -15, // Déplace l'icône vers la gauche
      },
      logo: {
        width: 190, // ajustez la largeur comme nécessaire
        height: 80, // ajustez la hauteur comme nécessaire
        marginLeft: 'auto',
        marginRight: 'auto'
      },
      item: {
        
        padding:35,
        flexDirection: 'row',
        alignItems: 'center',
      },
      onglet: {
        padding:15,
        backgroundColor: 'beige',
        margin: 25,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: 'black',
        elevation: 5,
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        
      },
      titleL: {
        fontSize: 20,
        fontFamily: 'NexaBold',        marginLeft: 25,
        marginBottom: 15,
        marginTop: 15,
      },
      ongletL: {
        backgroundColor: 'beige',
        borderRadius: 5,
        flexDirection: 'row',
        width: '45%',
        height: 130,
        alignItems: 'center',
        marginRight: 25,
        shadowColor: 'black',
        elevation: 5,
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
      },
      viewOnglet: {
        marginLeft: 30
      },
      title: {
        fontSize: 20,
        marginLeft: 25,
        marginBottom: 3,
        color: 'white',
        fontFamily: 'NexaBold'      },

      subtitle: {
        fontSize: 16,
        marginLeft: 25,
        marginBottom: 3,
        color: 'white',
        fontFamily: 'Nexa'

      },
      date: {
        marginLeft: 'auto',
        marginBottom: 'auto'
      },
      avatar: {
      }
    });
  export default EditProfile ;