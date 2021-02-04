import React, { useEffect } from 'react'
import './Header.css'
import { BiMenuAltLeft } from 'react-icons/bi';
import { IoCloseOutline } from 'react-icons/io5';
import { TweenMax } from 'gsap'
import { Link } from 'react-router-dom'


const Header = () => {

    useEffect(() => {
        TweenMax.from('.navLogo', { autoAlpha: 0, duration: 1, opacity: 0, y: 10, delay: 2 });
        TweenMax.from('.navToggle', { autoAlpha: 0, duration: 1, opacity: 0, y: 10, delay: 2 })
        TweenMax.from('.navItem', { autoAlpha: 0, opacity: 0, duration: 1, delay: 2.1, y: 30, stagger: 0.2, })

    }, [])

    return (
        <header className="l-header">
            <nav className="nav bd-grid-header">
                <div>
                    <a href="/home" className="navLogo">No Wires</a>
                </div>

                <div className="navToggle" id="nav-toggle" >
                    <BiMenuAltLeft />
                </div>

                <div className="navMenu" id="nav-menu">
                    <div className="navClose" id="nav-close">
                        <IoCloseOutline />
                    </div>

                    <ul className="navList">
                        <Link to="/dashboard" style={{ textDecoration: "none" }}>
                            <li className="navItem"><a href="/home" className="navLink active">Home</a></li>
                        </Link>

                        <Link to="/myOrders" style={{ textDecoration: "none" }}>
                            <li className="navItem"><a href="/about" className="navLink">About</a></li>
                        </Link>

                        <Link to="/myOrders" style={{ textDecoration: "none" }}>
                            <li className="navItem"><a href="/skills" className="navLink">Blog</a></li>
                        </Link>

                        <Link to="/myOrders" style={{ textDecoration: "none" }}>
                            <li className="navItem"><a href="/contact" className="navLink">Contact</a></li>
                        </Link>

                    </ul>
                </div>
            </nav>
        </header>
    );
}

export default Header;