import React from 'react';
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
                <img
                    class="dashboard"
                    src="https://anima-uploads.s3.amazonaws.com/projects/601a44218a5833fdfc9347e7/releases/601a44326fe923c6f32018a2/img/dashboard@2x.svg"
                />
                <div class="dashboard-1 poppins-normal-mine-shaft-12-7px">
                    <span class="span1">Dashboar</span><span class="span2">d</span>
                </div>
            </div>
            <div class="auto-flex1">
                <img
                    class="wallet"
                    src="https://anima-uploads.s3.amazonaws.com/projects/601a44218a5833fdfc9347e7/releases/601a518698ecce32c69c9cfb/img/wallet@2x.svg"
                />
                <div class="wallet-1 poppins-normal-black-12-7px">Files</div>
            </div>
            <div class="auto-flex2">
                <img
                    class="message"
                    src="https://anima-uploads.s3.amazonaws.com/projects/601a44218a5833fdfc9347e7/releases/601a518698ecce32c69c9cfb/img/message@2x.svg"
                />
                <div class="messages poppins-normal-mine-shaft-12-7px">
                    <span class="span1">Message</span><span class="span2">s</span>
                </div>
            </div>
            <div class="auto-flex3">
                <img
                    class="trade"
                    src="https://anima-uploads.s3.amazonaws.com/projects/601a44218a5833fdfc9347e7/releases/601a518698ecce32c69c9cfb/img/trade@2x.svg"
                />
                <div class="trade-1 poppins-normal-mine-shaft-12-7px-2">Settings</div>
            </div>
            <img
                class="collapse-icon"
                src="https://anima-uploads.s3.amazonaws.com/projects/601a44218a5833fdfc9347e7/releases/601a518698ecce32c69c9cfb/img/collapse-icon@2x.svg"
            />
        </div>
    )
}

export default Sidebar;