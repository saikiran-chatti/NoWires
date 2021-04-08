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
            <div class="AboutClose" onClick={closeHandler}>
                <span class="AboutClosetop"></span>
                <span class="AboutClosebot"></span>
            </div>

            <p id="contact_us">Contact us</p>
            <h1 id="email">Jayanth Saikiran</h1>
        </div>
    )
}

export default Contact
