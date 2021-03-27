import React from 'react';
import './DownloadPopup.css'

const DownloadPopup = (props) => {

    const formatBytes = (a, type) => {
        if (type === 2)
            return "Folder"
        if (0 === a)
            return "0 B";
        const c = 2, d = Math.floor(Math.log(a) / Math.log(1000));
        return parseFloat((a / Math.pow(1000, d)).toFixed(c)) + " " + ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"][d]
    }

    return (
        <div className="transfer">
            <div className="transfer-header">
                <p className="transfer-header-title">{props.placeholder}</p>
            </div>
            <div className="transfer-body poppins-medium-black-18px">
                <div className="file-details">
                    <div className="file-name">
                        <div className="file">File&nbsp;&nbsp; :</div>
                        <div className="marshmello">{props.name}</div>
                    </div>
                    <div className="file-path">
                        <div className="path-1 ">Path :</div>
                        <div className="pathvalue ">{props.path.substring(2)}</div>
                    </div>
                    <div className="transfer-file-size">
                        <div className="transfer-size-1 ">Size&nbsp;&nbsp;:</div>
                        <div className="transfer-address ">{formatBytes(props.size, props.type)}</div>
                    </div>
                </div>
            </div>
            <div class="Progressui Progressblack Progressactive progress" data-percent="90">
                <div class="Progressbar" style={{ width: "100%" }}></div>
            </div>
        </div>
    )
}

export default DownloadPopup;