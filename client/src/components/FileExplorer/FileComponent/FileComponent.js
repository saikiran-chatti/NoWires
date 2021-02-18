import React from 'react';
import './FileComponent.css'

const FileComponent = (props) => {
    return (
        <div class="file-data">
            <div class="overlap-group-1">
                <div class="rectangle-9-1"></div>
                <div class="rectangle-10-1"></div>
                <div class="rectangle-5-copy-1"></div>
            </div>
            <div class="client-documents poppins-medium-black-14px">{props.name}</div>
            <div class="date poppins-medium-black-14px">{props.lastMod}</div>
            <div class="address poppins-medium-black-14px">{props.size}</div>
        </div>
    )
}

export default FileComponent;