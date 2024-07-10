import { StyleSheet, SafeAreaView , Text, View ,   KeyboardAvoidingView,
  TouchableHighlight, Image,FlatList, Button,TextInput,ScrollView } from 'react-native';
import React, { useState, useEffect, useRef, useContext } from 'react';
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useWebSocket } from './WebSocketContext';

function SalonPublic({ route, navigation, testId }) {

  const [inputMessage, setInputMessage] = useState('');
  const [ws, setWs] = useState(null);
  const [messagesRecus, setMessagesRecus] = useState([]);
  const [messagesEnv, setMessagesEnv] = useState([]);
  const [dataz, setDataz] = useState(null); // State to store the retrieved data
  const scrollViewRef = useRef(null);
  const { socket, dendams, setDendams } = useWebSocket();
  const [userlist, setUserlist] = useState([]);

  console.log("WebSocket" + socket);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await fetch('http://localhost:3000/dendam', {
          method: 'GET',
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();

        // Store the fetched data in AsyncStorage
        await AsyncStorage.setItem('fetchedData', JSON.stringify(data.userId));
        console.log('Data stored successfully:', data);
        setDataz(data); // Set the retrieved data into the state
      } catch (error) {
        console.error('Error fetching or storing data:', error);
      }
    };
    fetchData();
    const loadThread = async () => {
      try {
        const response = await fetch('http://localhost:3000/thread/' , { method: 'GET' } );
        if (response.ok) {
          console.log('User data loaded');
          const threadata = await response.json();
          console.log(threadata);
          for (let index = 0; index < threadata.length; index++) {
            const element = threadata[index];
            const threadMessage = { username: element.username , messageText: element.message, time: element.time };
            console.log(threadMessage);
            setMessagesRecus(prevMessages => [...prevMessages, threadMessage ]);
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
    loadThread();
  }, []); // Run this effect only once, on mount

  useEffect(() => {
    if (dataz) {
      if (socket) {
        socket.send(
          JSON.stringify({
            type: 'joinRoom',
            roomId: 1,
            messageText: 'Salon 1',
            username: dataz.username || 'No data yet',
            userId: dataz.userId
          })
        );

        socket.onmessage = (e) => {
          const message = JSON.parse(e.data);
          if(message.type === "messageToChat") {
              setMessagesRecus(prevMessages => [...prevMessages, message ]);
          }
          else {
            if (message.type === "joiningMessage") {
              setMessagesRecus(prevMessages => [...prevMessages, message ]);
            }
            else {
              if(message.type === "updateUserStatus") {
                setUserlist(message.list);
              }
            }
          }
        }
      }
      else {
        console.log('Socket is null');
      }
  }
  }, [dataz,socket]);
  setDendams(userlist);
  const sendMessage = () => {
      if (inputMessage.trim() !== '') {
        const currentDate = new Date();
        const currentHour = currentDate.getHours();
        const currentMinutes = currentDate.getMinutes();
        const formattedTime = `${currentHour.toString().padStart(2, '0')}:${currentMinutes.toString().padStart(2, '0')}`;
        const data = JSON.stringify({ type: 'messageToRoom', roomId: '1' , messageText: inputMessage , time: formattedTime , username: dataz.username}) ;
        socket.send(data);
        setInputMessage('');

      }
  };
  // Function to scroll to the bottom
  const scrollToBottom = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  };

  // Scroll to bottom on component mount or content change
  useEffect(() => {
    scrollToBottom();
  }, []);
    return (<View style={styles.container}>
              <ScrollView style={styles.feed}>
                    {messagesRecus.map((message, index) => (
                     <View style={[styles.messagesRecus]}>
                      <Text key={index}><Text style={styles.username}>{message.username} </Text>: {message.messageText}</Text>
                      <Text style={[styles.msgTime]}>{message.time}</Text>
                      </View>   
                    ))}
              </ScrollView>
              <View style={styles.search}>
                <View style={styles.send}>
                <TextInput
                  style={styles.input}
                  value={inputMessage}
                  onChangeText={(text) => setInputMessage(text)}       
                />
          
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
    username: {
      fontWeight: 'bold'
    },
    msgTime: {
      marginLeft: 'auto'
    },
    feed:{
      marginTop: 70,
      marginBottom: 70,
      height: '100%',
      marginLeft: 25,
    },
    messagesRecus: {
      shadowColor: 'black',
      backgroundColor: 'lightblue',
      marginBottom: 30,
      shadowOffset: {width: -1, height: 1},
      shadowOpacity: 0.2,
      shadowRadius: 3,marginRight: 'auto',
      color: 'black',
      padding:12,

      borderRadius: 15,
      width:'90%'
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
      backgroundColor: 'lightblue',
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
      height: 70,
      marginTop: 70,
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
export default SalonPublic;