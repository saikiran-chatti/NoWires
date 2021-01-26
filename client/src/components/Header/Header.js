import React, { Component } from 'react';
import './Header.css'
import { Link } from 'react-router-dom'
import { BiMenuAltLeft } from 'react-icons/bi';
import { IoCloseOutline } from 'react-icons/io5';


const Header = () => {
    return (
        <header className="l-header">
            <nav className="nav bd-grid">
                <div>
                    <a href="#" className="navLogo">Coffee</a>
                </div>

                <div className="navToggle" id="nav-toggle">
                    <BiMenuAltLeft />
                </div>

                <div className="navMenu" id="nav-menu">
                    <div className="navClose" id="nav-close">
                        <IoCloseOutline />
                    </div>

                    <ul className="navList">
                        <li className="navItem"><a href="#home" className="navLink active">Home</a></li>
                        <li className="navItem"><a href="#about" className="navLink">About</a></li>
                        <li className="navItem"><a href="#skills" className="navLink">Blog</a></li>
                        <li className="navItem"><a href="#contact" className="navLink">Contact</a></li>

                        {/* <Link to="/" style={{ textDecoration: "none" }}>
                            <li className="navItem">Home</li>
                        </Link>
                        <Link to="/myOrders" style={{ textDecoration: "none" }}>
                            <li className="navItem">My Orders</li>
                        </Link>
                        <Link to="/" style={{ textDecoration: "none" }}>
                            <li className="navItem">Contact Us</li>
                        </Link> */}
                    </ul>
                </div>
            </nav>
        </header>
    );
}

export default Header;