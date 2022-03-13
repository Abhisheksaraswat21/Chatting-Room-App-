import React from 'react'
import './login.css'
import { Button } from '@material-ui/core'
import {auth, provider} from './firebase'
import { useStateValue } from './StateProvider'
import { actionTypes } from './reducer'
function Login() {

//we took usestate value from stateprovider 

//the first part can be used as a destructorlike {user, }

  const [{}, dispatch] = useStateValue();



  const signIn = () => {
    //provider is google auth provider in firebase .js

auth.signInWithPopup(provider).then((result) => 
  {
    dispatch({
 type: actionTypes.SET_USER,
 //user got the value from the data base here
 //noe we can destrcut user value anywheere we want ... like we did now in app.js
 user: result.user,
    })
  })
.catch((error) => alert(error.messsage));

  };


  return (
    <div className='login'>

<div className="login__container">

<img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="" />

<div className="login__text">
  <h1>welcome to whatsapp</h1>

</div>

{/* //THIS IS BUTTON FOR SIGININ AND WE HAVE ATTACHED FIREBASE GOOGLE LOGIN--- */}

<Button onClick={signIn}>Signin with google </Button>
</div>




    </div>
  )
}

export default Login;