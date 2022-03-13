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

          
 const [rooms, setRooms] = useState([]);


 //we took this from login.js
 const [{user}, dispatch] = useStateValue();





useEffect(()=> {
 
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

    return (
        <div className='sidebar'> 

 <div className="sidebar__header">


<Avatar src={user?.photoURL} />


<div className='sidebar__headerRight'>



<IconButton > <DonutLargeIcon /> </IconButton>
<IconButton > <ChatIcon /> </IconButton>
<IconButton > <MoreVertIcon /></IconButton>


</div>
 </div>

<div className='sidebar__search'>

    <div className='sidebar__searchContainer'>

    <SearchOutlined/>  

<input placeholder='Search or start a new chat' type ='text' />


    </div>

</div>

{/* CHATS IN THE SIDEBAR ARE HERE */}

<div className='sidebar__chats'>
    <SidebarChat addNewChat /> 
    {/* <SidebarChat /> 
    <SidebarChat /> 
    <SidebarChat />  */}




{rooms.map(room => (
    <SidebarChat key={room.id} id={room.id} name={room.data.name} />
))}


</div>

        </div>
    )

   
}

export default Sidebar;
