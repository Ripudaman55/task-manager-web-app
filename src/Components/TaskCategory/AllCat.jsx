import React from 'react'
import './AllCat.css'
import { AddUserTask, ChangeofImportance, GetAllTasks, MarkasCompleted } from "../../firebase";
function AllCat(props) {

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
   
        
          <div 
          data-bs-spy="scroll"
              data-bs-target="#simple-list-example"
              data-bs-offset="2"
              data-bs-smooth-scroll="true"
              class="scrollspy-example scroller"
              tabindex="1"
              style={{height: '60vh', width: '98%'}}
              >
          
          
            {props.AllTasks.map((item, i) => {
              return (
                <div className="eachtask"
                
                style={{ display: props.AllTasks.length > 0 ? 'block' : "none" }}>
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
              );
            })}
          </div>

  )
}

export default AllCat