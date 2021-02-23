import React from 'react';
import './CreateFolder.css'

const CreateFolder = props => {
    return (
        <div className="popup">
            <div className="header">
                <span className="popup-heading">Create Folder</span>
                <span id="path">Internal Storage</span>
            </div>
            <input className="popup-input" type="text" placeholder="Enter folder name"></input>
        </div>
    )
}

export default CreateFolder;