import React, { useState, useContext } from "react";
import { NavLink, useLocation } from "react-router-dom";
import * as navbarStyle from "./styles/navbar.module.css";

function Navbar({ user }) {
  const [navbarOpen, setnavbarOpen] = useState(false);

  const currentPage = useLocation();

  const toggleNavbar = () => {
    if (navbarOpen) {
      setnavbarOpen(false);
    } else {
      setnavbarOpen(true);
    }
  };

  return (
    <div className={navbarStyle.maincontainer}>
      <nav className={navbarStyle.container}>
        <div>
          <h2>
            <NavLink
              style={{ color: "inherit", textDecoration: "none" }}
              to="/"
              exact
            >
              The Idea Project
            </NavLink>
          </h2>
        </div>

        <div className={navbarStyle.hamburger} onClick={toggleNavbar}>
          <ul>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>

        <div
          style={{ width: navbarOpen ? "200px" : "0px" }}
          className={navbarStyle.navcontainer}
        >
          <ul className={navbarStyle.navlist}>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/about">About</NavLink>
            </li>
            <li className={navbarStyle.navbtn}>
              {currentPage.pathname !== "/app/submit" ? (
                <NavLink to="/app/submit">Submit</NavLink>
              ) : (
                <NavLink to="/app/browse">Browse</NavLink>
              )}
            </li>
            <li>
              <a
                href="https://www.notion.so/How-to-use-Idea-Project-b4968be552f24ea8abefb56c97eb5019"
                target="_blank"
              >
                How to use
              </a>
            </li>
            {!(user.userType === "admin" && user.signedIn === true) && (
              <li>
                <NavLink to="/login">Admin Signin</NavLink>
              </li>
            )}
            {user.userType === "admin" ? (
              <li>
                <NavLink to="/admin/dashboard">Admin Dashboard</NavLink>
              </li>
            ) : (
              <></>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
