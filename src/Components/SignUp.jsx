import { useState } from "react";
import "./SignUp.css";
import { useNavigate } from "react-router-dom";
import { CreateNewUser, EmailVerifyByFirebase, createAuthUserWithEmailAndPassword } from "../firebase";
import {auth} from '../firebase'
function Signup(props) {

  // const nav = useNavigate();
  const [contact, setcontact] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { displayName, email, password, confirmPassword } = contact;
  async function handleClick(event) {
    if (password !== confirmPassword) {
      alert("Password do not match");
      return;
    }
    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      if(user === undefined)
      {
        alert("ENTER THE CREDENTIALS FIRST 🤨")
      }
      CreateNewUser(contact, user); 
      EmailVerifyByFirebase(user.email)
      props.setls(1)
      alert("SIGNUP DONE");
      // return nav('/Login');

    } catch (error) {
      console.log("error in creation", error.message);

      alert("SIGNUP FAILED / CREDENTIALS ALREADY EXISTS!!!👎🏻");

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
      <center> 
      <h2>TO DO Account</h2>
      </center>

      <h3>Name*</h3>
      <center>

      <input
        name="displayName"
        type="text"
        placeholder="name"
        onChange={handlepass}
        />
        </center>
      <br></br>
      <h3>Email*</h3>
      <center>

      <input
        name="email"
        type="email"
        placeholder="email"
        onChange={handlepass}
        />
        </center>
      <br></br>
      <h3>Password*</h3>
      <center>

      <input
        name="password"
        type="password"
        placeholder="password"
        onChange={handlepass}
        />
        </center>
      <br></br>
      <h3>Confirm Password*</h3>
 <center>

      <input
        name="confirmPassword"
        type="password"
        placeholder="confirmPassword"
        onChange={handlepass}
        />
        </center>
      <br></br>
      
      <button className="createbtn" onClick={handleClick}>Create</button>
    </div>
  );
}

export default Signup;
