import React, { useState } from 'react'
import './Contact.css'


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
                <img src="/images/linkedin.svg" alt="linkedin" onClick={() => window.open("https://www.linkedin.com/in/jayanthsaikiran/", "_blank")}/>
                <img src="/images/github.svg" alt="github" onClick={() => window.open("https://github.com/jayanthsaikiran", "_blank")}/>
                <img src="/images/twitter.svg" alt="twitter" onClick={() => window.open("https://twitter.com/jayanthsaikiran", "_blank")} />
            </div>
        </div>
    )
}

export default Contact
