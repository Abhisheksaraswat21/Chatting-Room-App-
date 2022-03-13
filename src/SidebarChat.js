import React, { useEffect } from 'react';
import './SidebarChat.css';
import { Avatar } from '@material-ui/core';
import { useState } from 'react';
import db from './firebase';
import { Link } from 'react-router-dom';


function SidebarChat({id, name, addNewChat}) {


//this lods some random number when the component is generated.

const [seed, setSeed] = useState('');

const [messages, setMessages] = useState("");




// we want to get the last message of the user to show it on the LHS --
 
useEffect(()=> {
if(id) {
    db.collection('rooms').doc(id)
    .collection('messages')
    .orderBy('timestamp', 'desc')
    .onSnapshot(snapshot => 
        setMessages(snapshot.docs.map((doc) => doc.data())));
    
}
},[id]);



//whenever sidebarchat loads it will calculate some random numbers
useEffect (() => {
  setSeed(Math.floor(Math.random() * 5000));
  }, []);



  const createChat =  () =>{

    const roomName = prompt("Please enter a name for the chat room");
    
    //THE NAME ENTERED IN THE PROMPT WILL BE ADDED IN THE COLLECTION OF THE NAME ROOM
  db.collection('rooms').add({
    name: roomName,
  })
 
    if(roomName)
    {
        // do some clever database stuff...
    }
  };


  return !addNewChat ? (


    //id is being passed here and we with the help of link to we are changing the url link here 
    //clicking on each room will change the url everytime according to the room clicked

  <Link to= {`/rooms/${id}`}>


<div className='sidebarChat'>


{/* //THIS LINK GENERATES DFFERENT AVATARS BASED ON THE STRING WE PASS AT THE END . THE STRING CAN BE RANDOM . */}

<Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} /> 

<div className= "sidebarChat__info" >

 <h2>{name}</h2>
 {/* //this will give the message which was last sent by user */}

 <p> {messages[0]?.message}</p>

</div>

   </div>



  </Link>



 
  ) 
  
  : 

  (
      //onn clicking the div we will go to functuion create chat
      <div onClick={createChat} className='sidebarChat'>
    <h2>add new chat</h2>
      </div>
  ) 
}

export default SidebarChat;
