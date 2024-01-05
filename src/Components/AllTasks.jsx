import React, { useState, useEffect } from "react";

import "./AllTasks.css";
import { AddUserTask, ChangeofImportance, GetAllTasks, MarkasCompleted } from "../firebase";
import AllCat from "./TaskCategory/AllCat";
import Important from "./TaskCategory/Important";
import Planned from "./TaskCategory/Planned";
import MyDay from "./TaskCategory/MyDay";
function AllTasks(props) {
  const [AllTasks, setTasks] = useState([]);
  const [cat, setcat] = useState(props.Taskn);

  const [inputValue, setInputValue] = useState("");

  const importancechange = async (item) => {
    // console.log(item)
    const result = await ChangeofImportance(
      props.user.email,
      item,
      !item.isimportant
    );
  };
  const CompletedOrNot = async (item) => {
    // console.log(item)
    const result = await MarkasCompleted(
      props.user.email,
      item,
      !item.iscompleted
    );
  };

  const handleinput = async (e) => {
    if (e.key === "Enter") {
      // Call your function here
      console.log(props.user);
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, "0");
      var mm = String(today.getMonth() + 1).padStart(2, "0");
      var yyyy = today.getFullYear();
      today = dd + "-" + mm + "-" + yyyy;
      AddUserTask(props.user, inputValue, today);
      // Reset the input value
      setInputValue("");
      // alert("data uploaded");
    }
  };
  const getdata = async () => {
    const result = await GetAllTasks(props.user.uid);
    setTasks(result);
    // console.log("All tasks: ", AllTasks);
  };
  useEffect(() => {
    let i = 0;
    if (i === 0) {
      getdata();
    }
    i++;
    setTimeout(getdata, 4000);
  });
  return (
    <div className="alis1">
      <div className="Task">
        <header>{props.Taskn}</header>
        <div>
          <br />
          <br />
          <br />
          <input
            type="text"
            className="basicinput"
            value={inputValue}
            placeholder="Add task here....."
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleinput}
          />
        </div>

{props.Taskn === "All" ? ( <AllCat AllTasks = {AllTasks} user={props.user}/>): null}
{props.Taskn === "Important" ? ( <Important AllTasks = {AllTasks} user={props.user}/>): null}
{props.Taskn === "Planned" ? ( <Planned AllTasks = {AllTasks} user={props.user}/>): null}
{props.Taskn === "My Day" ? ( <MyDay AllTasks = {AllTasks} user={props.user}/>): null}

      </div>
    </div>
  );
}

export default AllTasks;
