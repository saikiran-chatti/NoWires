import React, { useState } from 'react'
import './Contact.css'
import { AiFillLinkedin } from "react-icons/ai"
import { FaTwitter } from "react-icons/fa";
import { ImInstagram } from "react-icons/im";

const Contact = (props) => {

    const [closeState, setCloseState] = useState(true);

    const closeHandler = () => {
        setCloseState(false);
        setTimeout(() => {
            props.closeHandler();
        }, 1000);
    }

    return (
        <div className={closeState ? "about" : "closeabout"} >
            <div className="AboutClose" onClick={closeHandler}>
                <span className="AboutClosetop"></span>
                <span className="AboutClosebot"></span>
            </div>

            <p id="contact_us">Contact Me</p>
            <h1 id="email">Jayanth Saikiran</h1>
            <div className="social-media-icons-contact">
                <FaTwitter color="#fff" cursor="pointer" onClick={() => window.open("https://twitter.com/jayanthsaikiran", "_blank")} />
                <ImInstagram color="fff" cursor="pointer" onClick={() => window.open("https://instagram.com/jayanthsaikiran", "_blank")} />
                <AiFillLinkedin color="fff" cursor="pointer" onClick={() => window.open("https://www.linkedin.com/in/jayanthsaikiran/", "_blank")} />
            </div>
        </div>
    )
}

export default Contact
