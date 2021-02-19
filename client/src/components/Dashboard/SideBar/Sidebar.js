import React from 'react';
import { Link } from 'react-router-dom'
import './Sidebar2.css'

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="no-wires poppins-semi-bold-black-16-4px">No Wires</div>

            <div className="auto-flex">
                <div className="overlap-group">
                    {/* <img
                        className="oval-5"
                        src="https://anima-uploads.s3.amazonaws.com/projects/601a44218a5833fdfc9347e7/releases/601a44326fe923c6f32018a2/img/oval-5@2x.svg"
                    /> */}
                </div>
                <Link to="/dashboard" style={{ textDecoration: "none" }}>
                    <img
                        className="dashboard"
                        src="/images/icons/Dashboard.svg"
                    />
                </Link>
                <Link to="/dashboard" style={{ textDecoration: "none" }}>

                    <div className="dashboard-1 poppins-normal-mine-shaft-12-7px">
                        <span className="span1">Dashboar</span><span className="span2">d</span>
                    </div>
                </Link>

            </div>

            <div className="auto-flex1">
                <Link to="/dashboard" style={{ textDecoration: "none" }}>
                    <img
                        className="wallet"
                        src="/images/icons/Wallet.svg"
                    />
                </Link>
                <Link to="/dashboard" style={{ textDecoration: "none" }}>
                    <div className="wallet-1 poppins-normal-black-12-7px">Files</div>
                </Link>
            </div>
            <div className="auto-flex2">
                <Link to="/dashboard" style={{ textDecoration: "none" }}>
                    <img
                        className="message"
                        src="/images/icons/Message.svg"
                    />
                </Link>

                <Link to="/dashboard" style={{ textDecoration: "none" }}>
                    <div className="messages poppins-normal-mine-shaft-12-7px">
                        <span className="span1">Message</span><span className="span2">s</span>
                    </div>
                </Link>
            </div>
            <div className="auto-flex3">
                <Link to="/" style={{ textDecoration: "none" }}>
                    <img
                        className="trade"
                        src="/images/icons/Trade.svg"
                    />
                </Link>
                <Link to="/" style={{ textDecoration: "none" }}>
                    <div className="trade-1 poppins-normal-mine-shaft-12-7px-2">Settings</div>
                </Link>
            </div>
            <img
                className="collapse-icon"
                src="https://anima-uploads.s3.amazonaws.com/projects/601a44218a5833fdfc9347e7/releases/601a518698ecce32c69c9cfb/img/collapse-icon@2x.svg"
            />
        </div>
    )
}

export default Sidebar;