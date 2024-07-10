import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, SafeAreaView , Text, View , TouchableHighlight, Image,FlatList, TextInput,ScrollView } from 'react-native';

import logo from '../assets/logo.png'; // Tell webpack this JS file uses this image
import leo from '../assets/leo.jpeg';
import add from '../assets/add.png';
import ham from '../assets/ham.png'; // Tell webpack this JS file uses this image
import marsh from '../assets/marsh.jpg'
import { IconButton, MD3Colors } from 'react-native-paper';
import { Avatar } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';
import { useWebSocket } from './WebSocketContext';

function Search() {
  const { dendams, setDendams } = useWebSocket();
console.log(dendams);
  function checkIcon(iconAva) {
    if (iconAva == 'active') {
      return <><AntDesign name='checkcircle' size={14}  color='lightgreen' style={styles.icon}/><Text> Disponible</Text></>
    } 
    else {
      if (iconAva == 'absent') {
        return  <><AntDesign name='closecircle' size={14}  color='red' style={styles.icon}/><Text> Absent</Text></>
      }
      else {
        return  <><AntDesign name='minuscircle' size={14}  color='grey' style={styles.icon}/><Text> Indisponible</Text></>
      }
    }
  }
  console.log(dendams);

  const Item = ({title, etat}) => (
    <View style={styles.item}>
      <Avatar.Image size={60} source={marsh} style={styles.avatar} resizeMode='contain'/>
      <View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}> {checkIcon(etat)} </Text>

      </View>

    </View>
  );
    return (<View><ScrollView style={styles.container}>
      <FlatList
        style={styles.flaaat}
        data={dendams}
        renderItem={({item}) => <Item title={item.username} etat={item.status} />}
        keyExtractor={item => item.id}
      />
      </ScrollView>

      </View>

    );
  }
    
    const styles = StyleSheet.create({
      container: {
        width: '100%',
        backgroundColor: 'white',

      },
      add:{
        marginLeft: 'auto'
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
        marginBottom: 3,
        fontFamily: 'Nexa',
      },
      date: {
        marginLeft: 'auto',
        marginBottom: 'auto',
        fontFamily: 'NexaBold',
      },
      autcocomplete: {
        backgroundColor: 'lightgrey',
        height: '85%'
      },
      search: {
        position: 'absolute', left: 0, right: 0, bottom: 0,
        backgroundColor: '#FF4D71',
        padding: 15,
        width: '100%',
      },
      input: {
        height: 50,
        width: '100%',
        borderRadius: 8,
        borderWidth: 1,
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
      avatar: {
      }
    });
  export default Search;