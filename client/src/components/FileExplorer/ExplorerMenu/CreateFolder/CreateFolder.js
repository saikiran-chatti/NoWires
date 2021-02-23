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
        <div class="popup">
            <div class="header">
                <span class="popup-heading">Create Folder</span>
                <span id="path">Internal Storage</span>
            </div>
            <div class="bottom">
                <input class="popup-input"
                    value={value} type="text"
                    placeholder="Enter folder name"
                    onChange={handleChange}>
                </input>
                <button class="create" onClick={create}>Create</button>
            </div>
        </div>
    )
}

export default CreateFolder;