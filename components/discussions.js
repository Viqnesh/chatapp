import { StyleSheet, SafeAreaView , Text, View ,   KeyboardAvoidingView,
  TouchableHighlight, Image,FlatList, Button,TextInput,ScrollView } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import logo from '../assets/logo.png'; // Tell webpack this JS file uses this image
import leo from '../assets/leo.jpeg';
import add from '../assets/add.png';
import ham from '../assets/ham.png'; // Tell webpack this JS file uses this image
import marsh from '../assets/marsh.jpg'
import Navbar from './navbar';
import { IconButton, MD3Colors } from 'react-native-paper';
import { Avatar } from 'react-native-paper';
import { StreamChat } from 'stream-chat';
import { FontAwesome5 } from '@expo/vector-icons'; 




function Discussion({ route, navigation, testId }) {
  const [inputMessage, setInputMessage] = useState('');
  const { params } = route.params;
  const [dendams, setDendams] = useState([]);

  const [ws, setWs] = useState(null);
  const [messagesRecus, setMessagesRecus] = useState([]);
  const [messagesEnv, setMessagesEnv] = useState([]);
  const socketURL = 'ws://localhost:8080'; // Remplacez par l'URL de votre serveur WebSocket
  const roomId = params.testId ;
  const socket = useRef(null);

  useEffect(() => {

    const socket = new WebSocket(`${socketURL}/${roomId}`);
    setWs(socket);
    socket.onopen = () => {
      console.log('WebSocket connected');
      socket.send(JSON.stringify({ type: 'joinRoom', roomId: roomId , messageText: 'Salon' + roomId }));

    };

    socket.onmessage = (e) => {
      const message = e.data;
      console.log(message);
      setMessagesRecus(prevMessages => [...prevMessages, JSON.parse(message)]);
    };

    socket.onerror = (e) => {
      console.error('WebSocket error:', e.message);
    };

    socket.onclose = () => {
      console.log('WebSocket disconnected');
    };

    return () => {
      socket.close();
    };

  }, [roomId]);

  const sendMessage = () => {
      if (inputMessage.trim() !== '') {
        const currentDate = new Date();
        const currentHour = currentDate.getHours();
        const currentMinutes = currentDate.getMinutes();
        
        // Formatage de l'heure au format HH:MM(:SS)
        const formattedTime = `${currentHour.toString().padStart(2, '0')}:${currentMinutes.toString().padStart(2, '0')}`;


        const data = JSON.stringify({ type: 'messageToRoom', roomId: roomId , messageText: inputMessage , time: formattedTime }) ;
        ws.send(data);
        setMessagesEnv(prevMessages => [...prevMessages, JSON.parse(data)]);
        console.log(currentDate.toLocaleString());
        setInputMessage('');
      }
  };







    return (<View style={styles.container}>
              <View style={styles.headerBar}>
                <FontAwesome5 name="arrow-left" size={24} onPress={() => navigation.goBack()}  style={styles.iconPin} color='white'/> 
                <Avatar.Image size={40} source={marsh} style={styles.avatar} resizeMode='contain'/>
                <View>
                <Text style={styles.title}> {params.title}</Text>
                <Text style={styles.subtitle}> Disponible</Text>
                </View>
              </View>
              <ScrollView>
                    {messagesEnv.map((message, index) => (
                      <View style={styles.messagesEnv}>
                      <Text key={index}>{message.messageText} </Text>
                      <Text style={styles.msgTime}>{message.time} </Text>

                      </View>        
                    ))}
                    {messagesRecus.map((message, index) => (
                     <View style={styles.messagesRecus}>
                      <Text key={index}>{message.messageText}</Text>
                      <Text style={styles.msgTime}>{message.time}</Text>
                      </View>   
                    ))}
              </ScrollView>
              <View style={styles.search}>
                <View style={styles.send}>
                <TextInput
          style={styles.input}
          value={inputMessage}
          onChangeText={(text) => setInputMessage(text)}       />
          
        <FontAwesome5 name="arrow-left" size={24} onPress={sendMessage}  style={styles.btnSend} color='white'/> 
                </View>

        </View>
        </View>
    );
}
  const styles = StyleSheet.create({
    container: {
      width: '100%',
      flex:3,
      height:'100%',

    },
    msgTime: {
      marginLeft: 'auto'
    },
    messagesRecus: {
      backgroundColor: 'lightblue',      shadowColor: 'black',
      shadowOffset: {width: -1, height: 1},
      shadowOpacity: 0.2,
      shadowRadius: 3,marginRight: 'auto',
      color: 'black',padding:12,margin: 25,borderRadius: 15,width:'70%'
    },
    messagesEnv: {
      backgroundColor: 'beige',      shadowColor: 'black',
      shadowOffset: {width: -1, height: 1},
      shadowOpacity: 0.2,
      shadowRadius: 3,marginLeft: 'auto',
      color: 'black',padding:12,margin: 25,borderRadius: 15,width:'70%'
    },
    send: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    btnSend: {
      backgroundColor: 'lightgreen',
      padding: 15,
      borderRadius: 20,
      marginLeft: 'auto'
    },
    iconPin :{
      marginRight: 25,
      marginTop: 'auto',
      marginBottom: 10
    },
    headerBar: {
      fontSize: 18,
      padding: 15,
      backgroundColor: '#FF4D71',
      color: 'white',
      flexDirection: 'row',
      alignItems: 'flex-end',
      width: '100%',
      height: 100,
      position: 'fixed',
      fontWeight: 'bold',
      fontFamily: 'Nexa'
    },
   title: {
      fontSize: 18,
      color: 'white',
      fontWeight: 'bold',
      fontFamily: 'Nexa',
      marginLeft: 10,
      marginTop: 'auto'
    },
    subtitle: {
      fontSize: 12,
      color: 'white',
      fontFamily: 'Nexa',
      marginTop: 'auto',
      marginLeft: 10

    },
    item: {
        backgroundColor: 'white',
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: 'lightgrey',
        borderBottomWidth: 1
      },
    search: {
      position: 'absolute', left: 0, right: 0, bottom: 0,
      backgroundColor: '#FF4D71',
      padding: 15,
      width: '100%',
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
      shadowColor: 'black',
      shadowOffset: {width: -2, height: 4},
      shadowOpacity: 0.2,
      shadowRadius: 3,
      color: 'lightgrey'
    },

  });
export default Discussion;