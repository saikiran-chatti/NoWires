import React from 'react';
import './sidebar.css'

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="logo">
                <span className="logo_title" >No Wires</span>
            </div>
            <div className="sidebar_menu">
                <div className="menu1">
                    <span className="dash_logo"></span>
                    <span className="dash_title"> Dashboard </span>
                </div>
                <div className="menu2">
                    <span className="files_logo"></span>
                    <span className="files_title"> Files </span>
                </div>
                <div className="menu3">
                    <span className="message_logo"></span>
                    <span className="message_title"> Messages </span>
                </div>
                <div className="menu4">
                    <span className="settings_logo"></span>
                    <span className="setting_title"> Settings </span>
                </div>
            </div>
        </div>
    )
}

export default Sidebar;