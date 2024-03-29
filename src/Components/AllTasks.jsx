import React, { useState, useEffect } from "react";

import "./AllTasks.css";
import {
  AddUserTask,
  ChangeofImportance,
  GetAllCategoryTasks,
  MarkasCompleted,
  NewListInserted,
  getAllTasks,
  getCustomAllTasks,
} from "../firebase";
import AllCat from "./TaskCategory/AllCat";
import Important from "./TaskCategory/Important";
import Planned from "./TaskCategory/Planned";
import MyDay from "./TaskCategory/MyDay";
import Custom from "./TaskCategory/Custom";
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
      NewListInserted(props.user, inputValue, today);
      // Reset the input value
      setInputValue("");
      // alert("data uploaded");
    }
  };
  const getdata = async () => {
    const result = await getCustomAllTasks(props.user.uid);
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

        {props.Taskn === "All" ? (
          <AllCat AllTasks={AllTasks.all} user={props.user} />
        ) : props.Taskn === "Important" ? (
          <Important AllTasks={AllTasks.all} user={props.user} />
        ) : props.Taskn === "Planned" ? (
          <Planned AllTasks={AllTasks.all} user={props.user} />
        ) : props.Taskn === "My Day" ? (
          <MyDay AllTasks={AllTasks.all} user={props.user} />
        ) : (
          <Custom AllTasks={AllTasks.custom} user= {props.user} text={props.Taskn}/>
        )}
      </div>
    </div>
  );
}

export default AllTasks;
