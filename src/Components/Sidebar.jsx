import { useRef, useState, useEffect } from "react";
import "./Sidebar.css";
import React from "react";

function Sidebar(props) {
  const sidebarRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
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
              <button type="radio"id="simple-list-item-1">
                <i class="bi bi-brightness-high"></i>My Day
              </button>
              <button id="simple-list-item-2">
                <i class="bi bi-star"></i>Important
              </button>
              <button id="simple-list-item-3">
                <i class="bi bi-calendar2-week"></i>Planned
              </button>
              <button id="simple-list-item-4">
                <i class="bi bi-infinity"></i>All
              </button>
              <button id="simple-list-item-4">
                <i class="bi bi-house-door"></i>Assigned to me
              </button>
              <button id="simple-list-item-4">
                <i class="bi bi-list-task"></i>Tasks
              </button>
              <button id="simple-list-item-4">
                <i class="bi bi-list-task"></i>Item 1
              </button>
              <button id="simple-list-item-4">Item 1</button>
              <button id="simple-list-item-4">Item 1</button>
              <button id="simple-list-item-4">Item 1</button>
              <button id="simple-list-item-4">Item 1</button>
              <button id="simple-list-item-4">Item 1</button>
              <button id="simple-list-item-4">Item 1</button>
              <button id="simple-list-item-5">Item 1</button>
              <button id="simple-list-item-6">Item 1</button>
              <button id="simple-list-item-7">Item 1</button>
              <button id="simple-list-item-8">Item 1</button>
            </div>
          <div className="listnew">
            <input type="text" placeholder="new List"  />
            </div>
        </div>
          </div>
      )}
    </>
  );
}

export default Sidebar;
