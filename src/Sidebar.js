//its name is in capital as it is a component

import { Avatar, Icon, IconButton } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import './Sidebar.css';
import DonutLargeIcon from "@material-ui/icons/DonutLargeOutlined";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVertOutlined"
import { SearchOutlined } from '@material-ui/icons';
import SidebarChat from'./SidebarChat';
import db from './firebase';
import { Routes } from 'react-router-dom';
import { useStateValue } from './StateProvider';


function Sidebar() {

          
//we are giving an empty array to the room initially ...rooms will be fetched from firebase
 const [rooms, setRooms] = useState([]);


 //we took this from login.js
 const [{user}, dispatch] = useStateValue();





useEffect(()=> {
    //snapshot takes th picture of the collection 'rooms' in the database.
    //db is a variabke defined in the firebase.js
const unsubscribe = db.collection('rooms').onSnapshot(snapshot => 
setRooms(snapshot.docs.map(doc => 

    //ROOMS WILL BE UPDATED WITH THIS INFORMATION
    ({
        id: doc.id,
        data: doc.data(),
    }))
    
    )
);

return () => {
    unsubscribe();
}
},[]);
//end me [] means run this only once when the component is  loaded

    return (
        <div className='sidebar'> 

 <div className="sidebar__header">

     {/* //now in the avatar it will show the image of the logged in user */}

<Avatar src={user?.photoURL} />

{/* //avatar is the symbol of user..jese profile pic dikhti hai choti se */}

<div className='sidebar__headerRight'>



<IconButton > <DonutLargeIcon /> </IconButton>
<IconButton > <ChatIcon /> </IconButton>
<IconButton > <MoreVertIcon /></IconButton>

{/* ye saare icons humne lagaye hai..inko clickable bnaane ke liye humne IconButton ka use kia hai
this is with the help of material ui */}

{/* //ye saare icons hai jo humne material ui install krne ke baad use kre and fir humne 
//inko use krne ke liye import bhi kra hai upar */}

</div>
 </div>

<div className='sidebar__search'>

    <div className='sidebar__searchContainer'>

    <SearchOutlined/>  
    {/* //ye search icon hai  */}

<input placeholder='Search or start a new chat' type ='text' />
{/* ye input box banaya hai  */}


    </div>

</div>

{/* CHATS IN THE SIDEBAR ARE HERE */}

<div className='sidebar__chats'>
    <SidebarChat addNewChat /> 
    {/* <SidebarChat /> 
    <SidebarChat /> 
    <SidebarChat />  */}


{/* THESE ARE THE NAME OF THE ROOMS WE ARE GETTING FROM FIREBASE IN THE VARIABLE ROOM IN USEEFFECT */}

{rooms.map(room => (
    //in every room we are passing props as keys id and name 
    <SidebarChat key={room.id} id={room.id} name={room.data.name} />
))}


</div>

        </div>
    )

   
}

export default Sidebar;
