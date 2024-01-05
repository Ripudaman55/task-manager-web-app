
 import './Login.css'

import { useState } from "react";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate} from "react-router-dom";

import {
  CreateNewUser,
  // signInWithGooglePopup,
  // createuserdocfromAuth,
  //userDocRef,
  signinAuthUserWithEmailAndPassword,
} from "../firebase";

function Login(props) {
//  const nav = useNavigate();


  const [contact, setcontact] = useState({
    email: "",
    password: "",
  });
  const { email, password } = contact;
  async function handleClick(event) {
  
    try {
      const response = await signinAuthUserWithEmailAndPassword(
        email,
        password
      );
      if(response === undefined)
      {
        alert("Enter the credentials First.....👎🏻")
        // return nav('/login')
      }
     
      props.logged(true);
      alert("SIGN IN CONFIRM 👍")
    //   return nav('/');
      
    } catch (error) {
      console.log("error in login", error.message);
      alert("LOGIN FAILED!!!🙅🏻")
    }
  }

  function handlepass(event) {
    const value = event.target.value;
    const name = event.target.name;

    setcontact((prevalue) => {
      return {
        ...prevalue,
        [name]: value,
      };
    });
  }
  return (
    
    <div className="loginheader">
  


      <h3 className="H31">Your Email</h3>
      <center>
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handlepass}
          />
      </center>
      <br></br>
      <h3 className="H31">Your Password</h3>
      <center>
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handlepass}
          />
      </center>
      <br></br>
      <button className="login_btn" type='submit'onClick={handleClick}>Login in</button>
      <br></br>
         
  
    </div>
  );
}
export default Login;
