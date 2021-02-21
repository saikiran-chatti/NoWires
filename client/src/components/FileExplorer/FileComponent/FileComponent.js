import { React, useEffect, useState } from 'react';
import './FileComponent.css'
import { IconComponent } from './IconComponent/IconComponent';

const FileComponent = (props) => {

    const [fileProp, setFileProp] = useState({})

    useEffect(() => {
        setFileProp(prevState => {
            return { ...prevState, size: formatBytes(props.size, props.type) }
        })
        setFileProp(prevState => {
            return { ...prevState, lastMod: formatDate(props.lastMod) }
        })

        let ext = ''
        if (props.name.search('.') !== -1)
            ext = props.name.split('.').pop();

        setFileProp(prevState => {
            console.log(ext);
            return { ...prevState, extension: ext.toLowerCase() }
        })
    }, [fileProp])

    const formatDate = (date) => {
        let d = new Date(date);
        let x = d.toDateString().split(" ");
        return x[2] + " " + x[1] + " " + x[3];
    }

    function formatBytes(a, type, b = 2) {
        if (type === 2)
            return "Folder"
        if (0 === a)
            return "0 B";
        const c = 0 > b ? 0 : b, d = Math.floor(Math.log(a) / Math.log(1000));
        return parseFloat((a / Math.pow(1000, d)).toFixed(c)) + " " + ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"][d]
    }

    return (
        <div className="file-data" onClick={props.onClick}>
            <IconComponent type={props.type} extension={fileProp.extension} />
            <div className="client-documents poppins-medium-black-14px">{props.name}</div>
            <div className="date poppins-medium-black-14px">{fileProp.lastMod}</div>
            <div className="address poppins-medium-black-14px">{fileProp.size}</div>
        </div>
    )
}

export default FileComponent;