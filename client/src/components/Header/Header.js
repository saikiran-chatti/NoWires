import React, { useEffect, useState } from 'react'
import './Header.css'
import { BiMenuAltLeft } from 'react-icons/bi';
import { IoCloseOutline } from 'react-icons/io5';
import { TweenMax } from 'gsap'
import { useHistory } from "react-router-dom";
import Contact from '../../pages/Contact/Contact';
// import { Link } from 'react-router-dom'

const Header = () => {

    let history = useHistory();
    const [contactPageStatus, setContactPageStatus] = useState(false);

    const changeRoute = (path) => {
        history.push(path);
    }

    useEffect(() => {
        TweenMax.from('.navLogo', { autoAlpha: 0, duration: 1, opacity: 0, y: 10, delay: 2 });
        TweenMax.from('.navToggle', { autoAlpha: 0, duration: 1, opacity: 0, y: 10, delay: 2 })
        TweenMax.from('.navItem', { autoAlpha: 0, opacity: 0, duration: 1, delay: 2.1, y: 30, stagger: 0.2, })
    }, [])

    const revealContactPage = () => {
        console.log('reached')
        setContactPageStatus(true)
    }

    return (
        <header className="l-header">
            <nav className="nav bd-grid-header">
                <div>
                    <a href="/" className="navLogo">No Wires</a>
                </div>

                <div className="navToggle" id="nav-toggle" >
                    <BiMenuAltLeft />
                </div>

                <div className="navMenu" id="nav-menu">
                    <div className="navClose" id="nav-close">
                        <IoCloseOutline />
                    </div>

                    <ul className="navList">
                        {/* <Link style={{ textDecoration: "none" }} to='/home'> */}
                        <li className="navItem navLink">Home</li>
                        {/* </Link> */}

                        {/* <Link style={{ textDecoration: "none" }} to='/myOrders'> */}
                        <li className="navItem" ><a onClick={() => changeRoute("/explorer")} className="navLink">Explorer</a></li>
                        {/* </Link> */}

                        {/* <Link style={{ textDecoration: "none" }} to='/about'> */}
                        <li className="navItem"><a onClick={() => changeRoute("/about")} className="navLink">About</a></li>
                        {/* </Link> */}

                        {/* <Link style={{ textDecoration: "none" }} to='/contact'> */}
                        <li className="navItem"><a onClick={() => revealContactPage()} className="navLink">Contact</a></li>
                        {/* </Link> */}

                    </ul>
                </div>
            </nav>
            {contactPageStatus && <div style={{
                display: 'flex',
                justifyContent: 'center',
            }}><Contact closeHandler={() => setContactPageStatus(false)} /></div>}
        </header>
    );
}

export default Header;