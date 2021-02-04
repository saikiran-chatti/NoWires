import React from 'react';
import { Link } from 'react-router-dom'
import './sidebar.css'

const Sidebar = () => {
    return (
        <div class="sidebar">
            <div class="no-wires poppins-semi-bold-black-16-4px">No Wires</div>

            <div class="auto-flex">
                <div class="overlap-group">
                    <img
                        class="oval-5"
                        src="https://anima-uploads.s3.amazonaws.com/projects/601a44218a5833fdfc9347e7/releases/601a44326fe923c6f32018a2/img/oval-5@2x.svg"
                    />
                </div>
                <Link to="/dashboard" style={{ textDecoration: "none" }}>
                    <img
                        class="dashboard"
                        src="https://anima-uploads.s3.amazonaws.com/projects/601a44218a5833fdfc9347e7/releases/601a44326fe923c6f32018a2/img/dashboard@2x.svg"
                    />
                </Link>
                <Link to="/dashboard" style={{ textDecoration: "none" }}>

                    <div class="dashboard-1 poppins-normal-mine-shaft-12-7px">
                        <span class="span1">Dashboar</span><span class="span2">d</span>
                    </div>
                </Link>

            </div>

            <div class="auto-flex1">
                <Link to="/dashboard" style={{ textDecoration: "none" }}>
                    <img
                        class="wallet"
                        src="https://anima-uploads.s3.amazonaws.com/projects/601a44218a5833fdfc9347e7/releases/601a518698ecce32c69c9cfb/img/wallet@2x.svg"
                    />
                </Link>
                <Link to="/dashboard" style={{ textDecoration: "none" }}>
                    <div class="wallet-1 poppins-normal-black-12-7px">Files</div>
                </Link>
            </div>
            <div class="auto-flex2">
                <Link to="/dashboard" style={{ textDecoration: "none" }}>
                    <img
                        class="message"
                        src="https://anima-uploads.s3.amazonaws.com/projects/601a44218a5833fdfc9347e7/releases/601a518698ecce32c69c9cfb/img/message@2x.svg"
                    />
                </Link>

                <Link to="/dashboard" style={{ textDecoration: "none" }}>
                    <div class="messages poppins-normal-mine-shaft-12-7px">
                        <span class="span1">Message</span><span class="span2">s</span>
                    </div>
                </Link>
            </div>
            <div class="auto-flex3">
                <Link to="/" style={{ textDecoration: "none" }}>
                    <img
                        class="trade"
                        src="https://anima-uploads.s3.amazonaws.com/projects/601a44218a5833fdfc9347e7/releases/601a518698ecce32c69c9cfb/img/trade@2x.svg"
                    />
                </Link>
                <Link to="/" style={{ textDecoration: "none" }}>
                    <div class="trade-1 poppins-normal-mine-shaft-12-7px-2">Settings</div>
                </Link>
            </div>
            <img
                class="collapse-icon"
                src="https://anima-uploads.s3.amazonaws.com/projects/601a44218a5833fdfc9347e7/releases/601a518698ecce32c69c9cfb/img/collapse-icon@2x.svg"
            />
        </div>
    )
}

export default Sidebar;