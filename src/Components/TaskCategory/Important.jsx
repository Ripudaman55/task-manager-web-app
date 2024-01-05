import { useState, useEffect } from "react";
import React from 'react'
import { AddUserTask, ChangeofImportance, GetAllTasks, MarkasCompleted } from "../../firebase";
function Important(props) {
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

  return (
    <div className="showtasks"
    data-bs-target="#simple-list-example"
              data-bs-offset="2"
              data-bs-smooth-scroll="true"
              class="scrollspy-example showtasks"
              tabindex="0">

            {props.AllTasks.map((item, i) => {
              console.log(item)
              return (
                <div className="eachtask"  style={{ display: item.isimportant === false ? "none" : 'block' }}>
                {item.isimportant ? 
                
                <div>
                  <input type="checkbox" />
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
                  :
                  null
                  }
                  
                </div>
              );
            })}
          </div>
    
  )
}

export default Important