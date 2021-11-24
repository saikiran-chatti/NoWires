import './Footer.css'
import {open} from "@tauri-apps/api/shell"

const Footer = () => {
    return (
        <div className="footer">
            <p className="footer-title">No Wires</p>
            <p className="terms-conditions">Terms of service &nbsp; &nbsp; . &nbsp; &nbsp; Privacy policy </p>
            <div className="social-media-icons">
                <img src="/images/linkedin.svg" alt="linkedin" onClick={async() =>await open("https://www.linkedin.com/in/jayanthsaikiran/")}/>
                <img src="/images/github.svg" alt="github" onClick={async() =>await open("https://github.com/jayanthsaikiran")}/>
                <img src="/images/twitter.svg" alt="twitter" onClick={async() => await open("https://twitter.com/jayanthsaikiran")} />
            </div>
        </div>
    )
}

export default Footer;