import React from 'react';
import './chat.css';
import { Avatar, IconButton } from '@material-ui/core';
import { useState, useEffect } from 'react';
import { AttachFile, InsertEmoticon, MoreVert, SearchOutlined } from '@material-ui/icons';
import MicIcon from "@material-ui/icons/Mic";
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import db from './firebase';
import { useStateValue } from './StateProvider';
import firebase from 'firebase/compat/app';



function Chat() {


  //this is for the message entered by the user

  const [input, setInput] = useState("");


const [seed, setSeed] = useState("");


//to get the chat id now we will use useparams
//hum chat id se hi chatting dikhayenge user ki
//use param se hume wo url mil jaata hai jo hume link to se link milega wo store hojaata hai

const { roomId } = useParams();

const [roomName, setRoomName] = useState("");


//we keep a state for the messages that we will take from user 
const [messages, setMessages] = useState([]);


//we got user here from login.js
const [{user}, dispatch] = useStateValue();



//whenever room id will be changed it willl get triggered---

useEffect(() => {
  
  //if roomid exists then we will save the name of the chatgroup in the setroomname
  if(roomId) {
  db.collection('rooms').doc(roomId).onSnapshot(snapshot => (setRoomName( snapshot.data().name)))
  }

  //thhe messages are getting into setmessages and it is array so map can be used
 //orderby means message will be arranged in ascending order accorfing to the timestamp
//also we have mapped the messages so every message will be shown accordingly
  db.collection('rooms').doc(roomId).collection('messages').orderBy('timestamp', 'asc').onSnapshot(snapshot =>(
    setMessages(snapshot.docs.map((doc) => doc.data()))
  ))
}, [roomId])




//whenever room id will be changed it willl get triggered---

useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
}, [roomId]);




const sendMessage = (e) => {
 e.preventDefault();
 console.log('you typed >>>', input);

db.collection('rooms').doc(roomId).collection('messages').add({
  //HERE MESSAGES ARE ADDED TO THE FIREBASE 
  //input is our message and name is coming from google authentication
  message: input,
  name: user.displayName,

  //this will give the timee according to the place u are living. basically it is giving time of the server
  timestamp: firebase.firestore.FieldValue.serverTimestamp(),
})



 setInput("");
 
}


  return <div className='chat'>

<div className='chat__header'>
<Avatar src= {`https://avatars.dicebear.com/api/human/${seed}.svg`} />

 <div className='chat__headerInfo'>

{/* //now the rooom name is coming from firebase here */}
     <h3>{roomName}</h3>
     <p>
       {/* //last seen is the timestamp of the last message sent by the user, so we did
       // message.length-1 */}
       
       last seen{" "}
       {new Date(
         messages[messages.length-1]?.
         timestamp?.toDate()
       ).toUTCString()}
       
     </p>

 </div>

<div className='chat__headerRight'>

 <IconButton><SearchOutlined /></IconButton>
 <IconButton><AttachFile/></IconButton>
 <IconButton><MoreVert /></IconButton>


</div>


 </div>



<div className='chat__body'>

{messages.map(message => (

//acc to me it means ki chat message ki class to rahegi hi pr agr message name humara google waale naam se same hoogya
//then it will be true and chat receiver bhi true hi hai to chat receiver bhi activate hojayegi
<p className={`chat__message ${message.name === user.displayName && `chat__reciever`}`}>

{/*///FOR THE NAME ON RHS WE DIDI THIS */}

<span className='chat__name'>{message.name}</span>
  
  {/* FOR THE MESSAGES THAT WE GET FROM MAP FUNCTON WE USE THIS */}

  {message.message}
  
  {/* //THIS IS A GOOD PRACTICE FOR GETTING THE timestamp */}

  <span className='chat__timestamp'> {new Date(message.timestamp?.toDate()).toUTCString()}</span>
  
  
  </p>

))}



</div>





<div className='chat__footer'>

<InsertEmoticon />

{/* //to have the input fnctionality I wrote form */}

<form> 
  
  {/* //whenever the value of the inpit box changes, it is stored in input variable with the help of setInput */}

  <input value={input} onChange={e => {
  setInput(e.target.value) 

}} placeholder="Type a message" type="text">
  </input>
<button onClick={sendMessage} type='submit'>Send a message</button>
</form>
<MicIcon />


</div>

  </div>;
}



export default Chat; 
