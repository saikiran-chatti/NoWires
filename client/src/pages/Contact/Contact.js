import React, { useState } from 'react'
import './Contact.css'
import {open} from "@tauri-apps/api/shell"


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
                <img src="/images/linkedin.svg" alt="linkedin" onClick={async() => open("https://www.linkedin.com/in/jayanthsaikiran/")}/>
                <img src="/images/github.svg" alt="github" onClick={async() => open("https://github.com/jayanthsaikiran")}/>
                <img src="/images/twitter.svg" alt="twitter" onClick={async() => open("https://twitter.com/jayanthsaikiran")} />
            </div>
        </div>
    )
}

export default Contact
