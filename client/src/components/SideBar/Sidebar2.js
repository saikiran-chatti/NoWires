import React from 'react';
import './Sidebar2.css'
import { useHistory } from "react-router-dom";

const Sidebar2 = () => {

    let history = useHistory();

    const changeRoute = (path) => {
        history.push(path);
    }

    return (
        <div className="sidebar">
            <div className="logo" onClick={() => changeRoute("/")}>
                    <img
                        alt="Logo"
                        src="/logo.svg"
                        width="20px"
                        height="20px"
                    />
                    <div className="cursor-pointer poppins-semi-bold-black-16-4px"
                        >No Wires</div>
            </div>
            <div className="auto-flex">
                <div className="sidebar-menu">
                    <div className="menu-1" onClick={() => changeRoute("/dashboard")}>
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
                    <div className="menu-2" onClick={() => changeRoute("/explorer")}>
                        {/* <Link to="/explorer" style={{ textDecoration: "none" }}> */}
                        <img
                            alt="wallet"
                            className="wallet"
                            src="/images/icons/Wallet.svg"
                        />
                        {/* </Link> */}
                        {/* <Link to="/explorer" style={{ textDecoration: "none" }}> */}
                        <div className="wallet-1 valign-text-middle poppins-normal-black-12-7px">Explorer</div>
                        {/* </Link> */}
                    </div>
                
                </div>
            </div>
        </div>
    );
}

export default Sidebar2;