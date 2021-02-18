import React from 'react';
import { Link } from 'react-router-dom'
import './Sidebar2.css'

const Sidebar2 = () => {
    return (
        <div class="sidebar">
            <div class="logo">
                <div class="overlap-group">
                    <img
                        class="logo-1"
                        src="/images/icons/Logo.svg"
                    />
                    <div class="no-wires poppins-semi-bold-black-16-4px">No Wires</div>
                </div>
            </div>
            <div class="auto-flex">
                <div class="frame-3">
                    <img
                        class="oval-5"
                        src="/images/icons/shadow.svg"
                    />
                </div>
                <div class="sidebar-menu">
                    <div class="menu-1">
                        {/* <Link to="/dashboard" style={{ textDecoration: "none" }}> */}
                            <img
                                class="dashboard"
                                src="/images/icons/Dashboard.svg"
                            />
                        {/* </Link> */}
                        {/* <Link to="/dashboard" style={{ textDecoration: "none" }}> */}
                            <div class="dashboard-1 valign-text-middle poppins-normal-mine-shaft-12-7px">
                                <span> <span class="span1">Dashboar</span><span class="span2">d</span> </span>
                            </div>
                        {/* </Link> */}
                    </div>
                    <div class="menu-2">
                        {/* <Link to="/explorer" style={{ textDecoration: "none" }}> */}
                            <img
                                class="wallet"
                                src="/images/icons/Wallet.svg"
                            />
                        {/* </Link> */}
                        {/* <Link to="/explorer" style={{ textDecoration: "none" }}> */}
                            <div class="wallet-1 valign-text-middle poppins-normal-black-12-7px">Files</div>
                        {/* </Link> */}
                    </div>
                    <div class="menu-3">
                        {/* <Link to="/dashboard" style={{ textDecoration: "none" }}> */}
                            <img
                                class="message"
                                src="/images/icons/Message.svg"
                            />
                        {/* </Link> */}
                        {/* <Link to="/dashboard" style={{ textDecoration: "none" }}> */}
                            <div class="messages poppins-normal-mine-shaft-12-7px">
                                <span class="span1">Message</span><span class="span2">s</span>
                            </div>
                        {/* </Link> */}
                    </div>
                    <div class="menu-4">
                        {/* <Link to="/dashboard" style={{ textDecoration: "none" }}> */}
                            <img
                                class="trade"
                                src="/images/icons/Trade.svg"
                            />
                        {/* </Link> */}
                        {/* <Link to="/dashboard" style={{ textDecoration: "none" }}> */}
                            <div class="trade-1 poppins-normal-mine-shaft-12-7px-2">Settings</div>
                        {/* </Link> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Sidebar2;