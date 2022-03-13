
import './App.css';
import Sidebar from './Sidebar';
import Chat from './Chat';
import React, { useState } from "react";
import Login from './login';
import { useStateValue } from './StateProvider';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";


function App() {

const [{user}, dispatch] =  useStateValue();
  
  return (
    //BEM maning conventions


    <div className="app">
   
  
{!user ? 

( <Login />)
:
(


<div className="app_body">


{/* //from here it will look router in the app  */}


<Router>

{/* //sidebar will always be displayed here without chats  */}

<Sidebar/>

  <Switch>

 <Route path="/rooms/:roomId">



 <Chat/>

 </Route>


<Route path="/">
<h1>Home</h1>
</Route>

</Switch>

</Router>
</div>



)

}
</div>

  );
}

export default App;
