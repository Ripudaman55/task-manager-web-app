import { useState, useEffect } from 'react';
import './App.css';
import AllTasks from './Components/AllTasks';
import Header from './Components/Header';
import Sidebar from './Components/Sidebar';
import { Button } from 'bootstrap';
import Signup from './Components/SignUp';
import Login from './Components/Login';
import { onAuthStateChanged } from "firebase/auth";
import { auth, app } from "./firebase";

function App() {
  const [slider, setslider] = useState(true)
  const [islogged, setlogged] = useState(false);
  const [LS, Setls] = useState(0);
  const [user, setUser] = useState("");
  const [taskn, setTask] = useState("");


  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setlogged(true)


        console.log("User->", user);
        setUser(user);
      }
      else {
        Setls(0)
        setlogged(false)
        auth.signOut();
        console.log("LOGEEDOUT");
      }
    })
  }, [user])
  return (
    <div className="App">
      <Header logged={islogged} setlogged={setlogged} />
      {!islogged ?
        <div>
          {
            LS === 0 || LS === 1 || LS === 2 ?
              <div className='loginsingup'>
                <button onClick={() => { Setls(1); console.log('1') }}>Login</button>
                <button onClick={() => Setls(2)}>Signup</button>

                {
                  LS === 1 ? <Login logged={setlogged} /> : ""
                }
                {
                  LS === 2 ? <Signup /> : ""
                } </div>
              : ""}</div>
        :
        <div className='App'>
          <i className="sea1 bi-list" onClick={() => { setslider(!slider) }}></i>
          <div className='sli'>
            <Sidebar result={slider} settask={setTask}/>
            <AllTasks Taskn={taskn} user={user} />
          </div>
        </div>
      }
    </div>
  );
}

export default App;
