import './Footer.css'

const Footer = () => {
    return (
        <div className="footer">
            <p className="footer-title">No Wires</p>
            <p className="terms-conditions">Terms of service &nbsp; &nbsp; . &nbsp; &nbsp; Privacy policy </p>
            <div className="social-media-icons">
                <img src="/images/linkedin.svg" alt="linkedin" onClick={() => window.open("https://www.linkedin.com/in/jayanthsaikiran/", "_blank")}/>
                <img src="/images/github.svg" alt="github" onClick={() => window.open("https://github.com/jayanthsaikiran", "_blank")}/>
                <img src="/images/twitter.svg" alt="twitter" onClick={() => window.open("https://twitter.com/jayanthsaikiran", "_blank")} />
            </div>
        </div>
    )
}

export default Footer;