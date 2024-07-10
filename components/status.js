import React, { createContext, useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View , TouchableHighlight, Image, FlatList, ScrollView, ImageBackground, Pressable } from 'react-native';

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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { parse } from 'react-native-svg';
import { useProfileContext } from './ProfileContext';
import { useWebSocket } from './WebSocketContext';

function Status({navigation}) {
    const {profileData , setProfileData} = useProfileContext();
    const [data, setData] = useState(null); // State to store the retrieved data
    const { socket, dendams, setDendams } = useWebSocket();

    console.log(profileData);
    useEffect( () => {

      const decodeTok = async () => {
        try {
          const token = await AsyncStorage.getItem('token');
          const fetchData = await AsyncStorage.getItem('fetchedData');
          const response = await fetch('http://localhost:3000/dendam', {
            method: 'GET',
            headers: { Authorization: `Bearer ${token}` },
          });
          const data = await response.json();
          console.log(fetchData);
          setProfileData(data);
        }
        catch (error) {
          console.error('Error fetching or storing data:', error);
        }
      }
      decodeTok();

  
    }, []); // Empty dependency array ensures this effect runs only once (on mount)

    const updateStatut = async (statusValue) => {
          if (socket) {
            socket.send(
              JSON.stringify({
                type: 'changeStatus',
                roomId: 1,
                messageText: 'Change User Statut',
                userId: profileData.userId,
                username: profileData.username,
                status: statusValue
              })
            );
        }
        else {
            console.log('Socket is null');
        }
    };
  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'En Ligne',
      label: 'active',
      color: 'green',
      iconz: 'checkcircle'
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Hors Ligne',
      label: 'HL',
      color: 'grey',
      iconz: 'minuscircle'
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Absent',
      label: 'absent',
      color: 'red',
      iconz: 'closecircle'
    },
  ];
  const Item = ({title , color , iconz, label}) => (
      <View style={styles.viewOnglet}>
        <Pressable onPress={() => updateStatut(label)} style={styles.onglet} styles={{backgroundColor: 'red'}}>
        <AntDesign name={iconz} size={30}  color={color} style={styles.icon}/> 
        <Text style={styles.label}> {title}</Text>
        </Pressable>
      </View>


  );


    return (
        <ScrollView style={styles.container} >
    <ImageBackground source={wall} resizeMode="cover" style={styles.item}>      
      <Avatar.Image size={90} source={leo} style={styles.avatar} resizeMode='contain'/>
        <View>
          <Text style={[styles.title]}>{profileData ? profileData.username : 'No data yet'}</Text>
          <Text style={styles.subtitle}>Score : 0</Text>
        </View>

        <FontAwesome5 name="pen" size={16} onPress={() => navigation.navigate('EditProfile')}  style={styles.btnSend} color='white'/> 

    </ImageBackground>
    <View>
      <Text style={styles.titleL}>Statut</Text>
      <FlatList
        data={DATA}
        horizontal={true}
        renderItem={({item}) => <Item title={item.title} iconz={item.iconz} color={item.color} label={item.label} />}
        keyExtractor={item => item.id}
      />
      </View>
      <View>
      <Text style={styles.titleL}>General</Text>
      </View>

      <View style={styles.socials}>
        <View style={styles.socialOng} styles={{backgroundColor: 'red'}}>      
          <FontAwesome5 name="at" size={40}   style={styles.socialIcon} color='purple'/>  
          <Text style={styles.socialText}>{profileData ? profileData.mail : 'Loading...'}</Text>       
        </View>
        <View style={styles.socialOng} styles={{backgroundColor: 'red'}}>
        <FontAwesome5 name="mobile" size={40}   style={styles.socialIcon} color='grey'/>   
        <Text style={styles.socialText}>{profileData ? profileData.phone : 'Loading...'}</Text>       
        </View>
        <View style={styles.socialOng} styles={{backgroundColor: 'red'}}>      
          <FontAwesome5 name="xbox" size={40}   style={styles.socialIcon} color='green'/>  
          <Text style={styles.socialText}>{profileData ? profileData.gamertag : 'Loading...'}</Text>       
        </View>
        <View style={styles.socialOng} styles={{backgroundColor: 'red'}}>
        <FontAwesome5 name="steam" size={40}   style={styles.socialIcon} color='black'/>   
        <Text style={styles.socialText}>{profileData ? profileData.steam : 'Loading...'}</Text>       
        </View>
      </View>

      <View>
      <Text style={styles.titleL}>Reseaux Sociaux</Text>

      <View style={styles.socials}>
        <View style={styles.socialOng} styles={{backgroundColor: 'red'}}>      
          <FontAwesome5 name="twitter" size={40}   style={styles.socialIcon} color='black'/>  
          <Text style={styles.socialText}>{profileData ? profileData.twitter: 'Loading...'}</Text>
        </View>
        <View style={styles.socialOng} styles={{backgroundColor: 'red'}}>
        <FontAwesome5 name="instagram" size={40}   style={styles.socialIcon} color='black'/>   
        <Text style={styles.socialText}>{profileData ? profileData.instagram : 'Loading...'}</Text>

        </View>
      </View>
      </View>

      </ScrollView>

    );
  }
    
    const styles = StyleSheet.create({
      container: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white',     
        marginTop:49

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
        backgroundColor: 'lightblue',
        padding: 15,
        borderRadius: 20,
        marginLeft: 'auto'
      },
      socialText:  {
        marginLeft: 'auto',
        fontFamily: 'Nexa',
        marginRight: '10',
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
        marginBottom: 15,
        fontSize: 15,
        marginRight: 'auto',
        marginLeft: 'auto'
      },
      icon: {
        position: 'absolute',
        left: 8
      },
      socialIcon: {
        marginRight: 'auto',
        marginLeft: 5,

      },
      iconPin: {
        position: 'absolute',
        top: 5, // Déplace l'icône vers le haut
        left: 40, // Déplace l'icône vers la gauche
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
        padding:13,
        backgroundColor: 'beige',
        margin: 15,
        borderRadius: 20,
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
        marginBottom: 5,
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
        marginLeft: 10
      },
      title: {
        fontSize: 20,
        marginLeft: 25,
        marginBottom: 3,
        color: 'white',
        fontFamily: 'NexaBold'      },
      label: {
        fontSize: 15,
        fontFamily: 'Nexa',
        marginBottom: 3,
        marginLeft: 35,
        alignItems: 'center',
      },
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
  export default Status ;