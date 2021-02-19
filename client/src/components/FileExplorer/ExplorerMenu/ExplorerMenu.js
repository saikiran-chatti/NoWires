import { React, useEffect, useState } from 'react';
import FileComponent from '../FileComponent/FileComponent';
import axios from 'axios'
import './ExplorerMenu.css'

const ExplorerMenu = () => {

    const [fileList, setFileList] = useState([]);

    useEffect(() => {
        axios.get('/parentList')
            .then((res) => {
                setFileList(res.data);
                console.log(fileList);
            })
            .catch(() => {
                console.log('error while fetching files list');
            });
    }, [])

    return (
        <div className="explorer-main-menu">
            <div className="explorer-title">
                <h1 className="dashboard-copy poppins-bold-black-27-3px">File Explorer</h1>
                <div className="overlap-group2">
                    <img
                        alt="magnifier"
                        className="oval-9"
                        src="/images/icons/Magnifier.svg"
                    />
                    {/* <img
                        className="path-6"
                        src="/images/icons/Magnifier.svg"
                    /> */}
                </div>
            </div>
            <div className="directory-path">
                <div className="overlap-group-1">
                    <div className="rectangle-9"></div>
                    <div className="rectangle-10"></div>
                    <div className="rectangle-5-copy"></div>
                </div>
                <p className="text-1 valign-text-middle poppins-medium-black-14px">All Files&nbsp;&nbsp;&gt; Important</p>
                <div className="frame-1">
                    <div className="overlap-group">
                        <div className="rectangle-1 bizarre-border-1px"></div>
                        <div className="rectangle-1 bizarre-border-1px"></div>
                        <div className="create-folder valign-text-middle poppins-light-black-14px">Create Folder</div>
                        <img
                            alt="addFolder"
                            className="icons8-add-older-50-1"
                            src="/images/icons/addFolder.svg"
                        />
                    </div>
                </div>
            </div>
            <div className="explorer-header">
                <div className="place valign-text-middle poppins-light-black-14px">Name</div>
                <div className="explorer-last-modified valign-text-middle poppins-light-black-14px">Last Modified</div>
                <div className="size valign-text-middle poppins-light-black-14px">Size</div>
            </div>
            <div className="explorer-data">
                {fileList.map((item, index) => {
                    return <FileComponent key={index}
                        name={item.name}
                        type={item.type}
                        size={item.size}
                        lastMod={item.modifiedAt} />
                })}
            </div>
        </div>

    )
}

export default ExplorerMenu;