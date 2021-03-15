import React from 'react';
// import { Link } from 'react-router-dom'
import './Sidebar2.css'
import { useHistory } from "react-router-dom";


const Sidebar2 = (props,context) => {

    let history = useHistory();

    const changeRoute = (path) => {
        history.push(path);
    }


    return (
        <div className="sidebar">
            <div className="logo">
                <div className="overlap-group">
                    <img
                        alt="Logo"
                        className="logo-1"
                        src="/images/icons/Logo.svg"
                    />
                    <div className="no-wires poppins-semi-bold-black-16-4px">No Wires</div>
                </div>
            </div>
            <div className="auto-flex">
                <div className="frame-3">
                    <img
                        alt="shadow"
                        className="oval-5"
                        src="/images/icons/shadow.svg"
                    />
                </div>
                <div className="sidebar-menu">
                    <div className="menu-1" onClick={() => changeRoute("/")}>
                        {/* <Link to="/dashboard" style={{ textDecoration: "none" }}> */}
                        <img
                            alt="dashboard"
                            className="dashboard"
                            src="/images/icons/Dashboard.svg"
                        />
                        {/* </Link> */}
                        {/* <Link to="/dashboard" style={{ textDecoration: "none" }}> */}
                        <div className="dashboard-1 valign-text-middle poppins-normal-mine-shaft-12-7px">
                            <span> <span className="span1">Dashboar</span><span className="span2">d</span> </span>
                        </div>
                        {/* </Link> */}
                    </div>
                    <div className="menu-2" onClick={() => changeRoute("/")}>
                        {/* <Link to="/explorer" style={{ textDecoration: "none" }}> */}
                        <img
                            alt="wallet"
                            className="wallet"
                            src="/images/icons/Wallet.svg"
                        />
                        {/* </Link> */}
                        {/* <Link to="/explorer" style={{ textDecoration: "none" }}> */}
                        <div className="wallet-1 valign-text-middle poppins-normal-black-12-7px">Files</div>
                        {/* </Link> */}
                    </div>
                    <div className="menu-3" onClick={() => changeRoute("/")}>
                        {/* <Link to="/dashboard" style={{ textDecoration: "none" }}> */}
                        <img
                            alt="message"
                            className="message"
                            src="/images/icons/Message.svg"
                        />
                        {/* </Link> */}
                        {/* <Link to="/dashboard" style={{ textDecoration: "none" }}> */}
                        <div className="messages poppins-normal-mine-shaft-12-7px">
                            <span className="span1">Message</span><span className="span2">s</span>
                        </div>
                        {/* </Link> */}
                    </div>
                    <div className="menu-4" onClick={() => changeRoute("/")}>
                        {/* <Link to="/dashboard" style={{ textDecoration: "none" }}> */}
                        <img
                            alt="trade"
                            className="trade"
                            src="/images/icons/Trade.svg"
                        />
                        {/* </Link> */}
                        {/* <Link to="/dashboard" style={{ textDecoration: "none" }}> */}
                        <div className="trade-1 poppins-normal-mine-shaft-12-7px-2">Settings</div>
                        {/* </Link> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Sidebar2;