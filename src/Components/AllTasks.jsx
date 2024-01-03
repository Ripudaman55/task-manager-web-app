import React, { useState } from 'react'

import './AllTasks.css'
import { AddUserTask } from '../firebase';
function AllTasks(props) {
  const [inputValue, setInputValue] = useState('');
  const handleinput=async(e)=>{
    
    if (e.key === 'Enter') {
      // Call your function here
      console.log(props.user)
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, "0");
      var mm = String(today.getMonth() + 1).padStart(2, "0");
      var yyyy = today.getFullYear();
      today = yyyy + "-" + mm + "-" + dd;
      AddUserTask(props.user, inputValue, today);
      // Reset the input value
      setInputValue('');
      alert('data uploaded')
    }
  }
  return (
    <div className='alis1'>

    < div className='Task'>
      <header>{props.Taskn}</header>
<div>
<input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyPress={handleinput}
      />

</div>
        
    </div>
    </div>
  )
}

export default AllTasks