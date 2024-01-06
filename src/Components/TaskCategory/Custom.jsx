import React, { useState } from "react";
import "./Custom.css";
import { ChangeofImportance, MarkasCompletedCustom } from "../../firebase";

function Custom(props) {
  const [CustomTask, setCustom] = useState([]);


  const importancechange = async (item) => {
    // console.log(item)
    // const result = await ChangeofImportance(
    //   props.user.email,
    //   item,
    //   !item.isimportant
    // );
  };
  const CompletedOrNot = async (item) => {
   
    //   const result = await MarkasCompletedCustom(
    //     props.user.email,
    //     item,
       
    //     !item.iscompleted
    //     );
      
      console.log(item)
  };
  

  const handledata = async () => {
    if (props.AllTasks !== undefined && props.AllTasks !== null) {
      setCustom(Object.keys(props.AllTasks).sort());
    //   console.log("cusotm", CustomTask);
    } else {
    //   console.log("data not yet wait....");
    }
  };
  setTimeout(() => {
    handledata();
  }, 2000);
  return (
    <div>
      {CustomTask.map((item, i) => {
        return (
          <>
            {props.Taskn === item
              ? item.map((item, i) => {
                  <>
                    <div
                      data-bs-spy="scroll"
                      data-bs-target="#simple-list-example"
                      data-bs-offset="2"
                      data-bs-smooth-scroll="true"
                      class="scrollspy-example scroller"
                      tabindex="1"
                      style={{ height: "60vh", width: "98%" }}
                    >
                      {props.AllTasks.map((item, i) => {
                        return (
                          <>
                            {item.iscompleted ? null : (
                              <div
                                className="eachtask"
                                style={{
                                  display:
                                    props.AllTasks.length > 0
                                      ? "block"
                                      : "none",
                                }}
                              >
                                <input
                                  type="checkbox"
                                  onClick={() => {
                                    CompletedOrNot(item);
                                  }}
                                />

                                <p className="p1">{item.taskvalue} </p>
                                <p className="p2">{item.date}</p>

                                {!item.isimportant ? (
                                  <div className="hearts">
                                    <i
                                      class="fa-regular fa-heart"
                                      onClick={() => importancechange(item)}
                                    ></i>
                                  </div>
                                ) : (
                                  <div className="hearts">
                                    <i
                                      class="fa-solid fa-heart"
                                      onClick={() => importancechange(item)}
                                    ></i>
                                  </div>
                                )}
                              </div>
                            )}
                          </>
                        );
                      })}
                    </div>
                  </>;
                })
              : ""}
          </>
        );
      })}
    </div>
  );
}

export default Custom;
