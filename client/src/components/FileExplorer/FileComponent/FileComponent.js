import { React, useEffect, useState } from 'react';
import './FileComponent.css';
import { IconComponent } from './IconComponent/IconComponent';
// import useClickPreventionOnDoubleClick from '../../../helpers/preventDoubleClick/useClickPreventionOnDoubleClick';
import useSingleAndDoubleClicks from '../../../helpers/useSingleClick/useSingleAndDoubleClicks'

const FileComponent = (props) => {

    const [fileProp, setFileProp] = useState({})
    const { handleClick, handleDoubleClick } = useSingleAndDoubleClicks({
        onClick: props.onClick,
        onDoubleClick: props.onDoubleClick
    });

    useEffect(() => {
        // console.log(props.name + props.type);
        setFileProp(prevState => {
            return { ...prevState, type: props.type }
        })

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
            return { ...prevState, extension: ext.toLowerCase() }
        })
    }, [props.lastMod, props.type, props.size, props.name]) // },[]

    const formatDate = (date) => {
        let d = new Date(date);
        let x = d.toDateString().split(" ");
        return x[2] + " " + x[1] + " " + x[3];
    }

    const formatBytes = (a, type) => {
        if (type === 2)
            return "Folder"
        if (0 === a)
            return "0 B";
        const c = 2, d = Math.floor(Math.log(a) / Math.log(1000));
        return parseFloat((a / Math.pow(1000, d)).toFixed(c)) + " " + ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"][d]
    }


    return (
        <div className="file-data"
            onClick={handleClick}
            onDoubleClick={handleDoubleClick}
            name={props.name}
            id={props.name + fileProp.type}
            onContextMenu={props.onContextMenu}>
            <IconComponent type={fileProp.type} extension={fileProp.extension} />
            <div className="client-documents poppins-medium-black-14px">{props.name}</div>
            <div className="date poppins-medium-black-14px">{fileProp.lastMod}</div>
            <div className="address poppins-medium-black-14px">{fileProp.size}</div>
        </div>

    )
}

export default FileComponent;