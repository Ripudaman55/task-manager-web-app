import { useRef, useState, useEffect } from "react";
import "./Sidebar.css";
import React from "react";
import { NewListInserted, getCustomAllTasks } from "../firebase";

function Sidebar(props) {
  const sidebarRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [taskshown, settaskn] = useState("");
  const [NewListName, setInputValue] = useState("");
  const [Alltasks, setalltask] = useState([]);
  const [Alltaskstoshow, setalltasktoshow] = useState([]);

  const handletaskn = (e) => {
    console.log(e);
    console.log(taskshown);
    props.settask(e);
    settaskn(e);
  };
  const handleinput = async (e) => {
    if (e.key === "Enter") {
      NewListInserted(props.user.email, NewListName);

      setInputValue("");
      // alert("data uploaded");
    }
  };

  const getdata = async () => {
    const result1 = await getCustomAllTasks(props.user.uid);
    setalltask(result1);
    // console.log("All tasks: ", Alltasks);
    if (
      Alltasks.custom !== undefined &&
      Alltasks.custom !== null
    ) {
      setalltasktoshow(Object.keys(Alltasks.custom).sort());
    } else {
      console.log("no data yet wait.....");
    }
  };
  setTimeout(getdata, 1000);

  useEffect(() => {
    handletaskn();
    if (props.result) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [props.result]);

  return (
    <>
      {isVisible && (
        <div className="alis">
          <div ref={sidebarRef} className={`slider`}>
            <div
              data-bs-spy="scroll"
              data-bs-target="#simple-list-example"
              data-bs-offset="2"
              data-bs-smooth-scroll="true"
              class="scrollspy-example"
              tabindex="0"
            >
              <button
                type="radio"
                id="simple-list-item-1"
                name="My Day"
                onClick={(e) => {
                  handletaskn("My Day");
                }}
              >
                <i class="bi bi-brightness-high"></i>My Day
              </button>
              <button
                id="simple-list-item-2"
                name="Important"
                onClick={(e) => {
                  handletaskn(e.target.name);
                }}
              >
                <i class="bi bi-star"></i>Important
              </button>
              <button
                id="simple-list-item-3"
                name="Planned"
                onClick={(e) => {
                  handletaskn(e.target.name);
                }}
              >
                <i class="bi bi-calendar2-week"></i>Planned
              </button>
              <button
                id="simple-list-item-4"
                name="All"
                onClick={(e) => {
                  handletaskn(e.target.name);
                }}
              >
                <i class="bi bi-infinity"></i>All
              </button>
              <button id="simple-list-item-4">
                <i class="bi bi-house-door"></i>Assigned to me
              </button>
              <button id="simple-list-item-4">
                <i class="bi bi-list-task"></i>Tasks
              </button>
              {Alltaskstoshow !== null && Alltaskstoshow !== undefined ? (
                Alltaskstoshow.map((item, i) => (
                  <button key={i} id="simple-list-item-4" name={item}  onClick={(e) => {
                    handletaskn(e.target.name);
                  }} >
                    <i className="bi bi-list-task"></i> {item}
                  </button>
                ))
              ) : (
                <p>No data yet, please wait...</p>
              )}
            </div>
            <div className="listnew">
              <input
                type="text"
                className="basicinput"
                value={NewListName}
                placeholder="New List"
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleinput}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Sidebar;
