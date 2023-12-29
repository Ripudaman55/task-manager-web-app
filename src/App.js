import { useState } from 'react';
import './App.css';
import AllTasks from './Components/AllTasks';
import Header from './Components/Header';
import Sidebar from './Components/Sidebar';

function App() {
  const [slider, setslider] = useState(false)
  return (
    <div className="App">
     <Header/>
     
     <i class="sea1 bi-list" onClick={()=>{setslider(!slider)}}></i>
     <div className='sli'>
     <Sidebar result={slider}/>
     
     <AllTasks/>
     </div>
     
    </div>
  );
}

export default App;
