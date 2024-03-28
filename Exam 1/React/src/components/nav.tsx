import React from "react";
import { Link, Outlet } from "react-router-dom";

const Nav = () => {
  return (
    <>
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand" href="#">  
            🩺          
            </a>
          </div>

          <ul className="nav navbar-nav">
            <li>
              <Link to="/showClients">Clients</Link>
            </li>
            <li>
              <Link to="/addClient">Add Client</Link>
            </li>
          </ul>
        </div>
      </nav>
      <Outlet></Outlet>
    </>
  );
};
export default Nav;
