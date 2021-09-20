import React from 'react';
import { FaTwitter } from "react-icons/fa";
import { ImInstagram, ImYoutube } from "react-icons/im";
import './Footer.css'

const Footer = () => {
    return (
        <div className="footer">
            <p className="footer-title">No Wires</p>
            <p className="terms-conditions">Terms of service &nbsp; &nbsp; . &nbsp; &nbsp; Privacy policy </p>
            <div className="social-media-icons">
                <ImYoutube color="fff" cursor="pointer" onClick={() => window.open("https://youtube.com", "_blank")} />
                <FaTwitter color="#fff" cursor="pointer" onClick={() => window.open("https://twitter.com", "_blank")} />
                <ImInstagram color="fff" cursor="pointer" onClick={() => window.open("https://instagram.com", "_blank")} />
            </div>
        </div>
    )
}

export default Footer;