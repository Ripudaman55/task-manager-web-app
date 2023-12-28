import React, { useState } from "react";
import "./Header.css";
function Header() {
  const [islogged, uselogged] = useState(true);

  return (
    <div className="header" style={{ display: "flex", alignItems: "center" }}>
      <i class="fa fa-th hamburger" aria-hidden="true"></i>
      <h4 className="todo">To Do</h4>
      <div className="col d-flex justify-content-center align-items-center">
        <div className="searchbar">
          <i className="bi bi-search"></i>
          <input className="search" type="search" placeholder="Search" aria-label="Search"></input>
        </div>
      </div>
      <div>
        <div className="dropdown">
         
          <i class="bi-sliders2" data-bs-toggle="dropdown" aria-expanded="false"></i>
         

          <ul class="dropdown-menu">
            
            <li><a class="dropdown-item" href="#">Another action</a></li>
            <li><a class="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </div>
      </div>
      <div>
      {islogged ?
      <div className="dropdown">

        <img className="profilepic dropdown-toggle" src="https://avatars.githubusercontent.com/u/101038216?v=4" alt="RT" data-bs-toggle="dropdown" aria-expanded="false" />
        <ul class="dropdown-menu">
            <img src="https://avatars.githubusercontent.com/u/101038216?v=4" alt="RT" />
            <h6>Ripudaman</h6>
            <a href="">Account</a>
            <a href="">Sign out</a>
          </ul>
      </div>

        : <i className=" bi-list hamburger"></i>}


      </div>
    </div>
  );
}

export default Header;
