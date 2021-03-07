import React, { useState } from 'react';
import './CreateFolder.css'

const CreateFolder = props => {

    const [value, setValue] = useState('')

    const handleChange = (e) => {
        setValue(e.target.value)
    }

    const create = () => {
        props.create(value);
        props.closeHandler();
    }

    return (
        <div className="popup">
            <div className="header">
                <span className="popup-heading">Create Folder</span>
                <span id="path">{props.path}</span>
            </div>
            <div className="bottom">
                <input className="popup-input"
                    value={value} type="text"
                    placeholder="Enter folder name"
                    onChange={handleChange}>
                </input>
                <button className="create" onClick={create}>Create</button>
            </div>
        </div>
    )
}

export default CreateFolder;