import React, {  useState } from "react";
import "./PlainHeader.css";
import { BiMenuAltLeft } from "react-icons/bi";
import { IoCloseOutline } from "react-icons/io5";
import { useHistory } from "react-router-dom";
import Contact from "../../pages/Contact/Contact";
// import { Link } from 'react-router-dom'

const PlainHeader = () => {
  let history = useHistory();
  const [contactPageStatus, setContactPageStatus] = useState(false);

  const changeRoute = (path) => {
    history.push(path);
  };

  const revealContactPage = () => {
    console.log("reached");
    setContactPageStatus(true);
  };

  return (
    <header className="l-header">
      <nav className="nav bd-grid-header">
        <div>
          <a href="/" className="navLogo">
            No Wires
          </a>
        </div>

        <div className="navToggle" id="nav-toggle">
          <BiMenuAltLeft />
        </div>

        <div className="navMenu" id="nav-menu">
          <div className="navClose" id="nav-close">
            <IoCloseOutline />
          </div>

          <ul className="navList">
            {/* <Link style={{ textDecoration: "none" }} to='/home'> */}
            <li className="navItem navLink">
              <a onClick={() => changeRoute("/")} className="navLink">
                Home
              </a>
            </li>
            {/* </Link> */}

            {/* <Link style={{ textDecoration: "none" }} to='/myOrders'> */}
            <li className="navItem">
              <a onClick={() => changeRoute("/explorer")} className="navLink">
                Explorer
              </a>
            </li>
            {/* </Link> */}

            {/* <Link style={{ textDecoration: "none" }} to='/about'> */}
            <li className="navItem">
              <a onClick={() => changeRoute("/about")} className="navLink">
                About
              </a>
            </li>
            {/* </Link> */}

            {/* <Link style={{ textDecoration: "none" }} to='/contact'> */}
            <li className="navItem">
              <a onClick={() => revealContactPage()} className="navLink">
                Contact
              </a>
            </li>
            {/* </Link> */}
          </ul>
        </div>
      </nav>
      {contactPageStatus && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Contact closeHandler={() => setContactPageStatus(false)} />
        </div>
      )}
    </header>
  );
};

export default PlainHeader;
