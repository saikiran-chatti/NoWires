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
        <div class="explorer-main-menu">
            <div class="explorer-title">
                <h1 class="dashboard-copy poppins-bold-black-27-3px">File Explorer</h1>
                <div class="overlap-group2">
                    <img
                        class="oval-9"
                        src="/images/icons/Magnifier.svg"
                    />
                    {/* <img
                        class="path-6"
                        src="/images/icons/Magnifier.svg"
                    /> */}
                </div>
            </div>
            <div class="directory-path">
                <div class="overlap-group-1">
                    <div class="rectangle-9"></div>
                    <div class="rectangle-10"></div>
                    <div class="rectangle-5-copy"></div>
                </div>
                <p class="text-1 valign-text-middle poppins-medium-black-14px">All Files&nbsp;&nbsp;&gt; Important</p>
                <div class="frame-1">
                    <div class="overlap-group">
                        <div class="rectangle-1 bizarre-border-1px"></div>
                        <div class="rectangle-1 bizarre-border-1px"></div>
                        <div class="create-folder valign-text-middle poppins-light-black-14px">Create Folder</div>
                        <img
                            class="icons8-add-older-50-1"
                            src="/images/icons/addFolder.svg"
                        />
                    </div>
                </div>
            </div>
            <div class="explorer-header">
                <div class="place valign-text-middle poppins-light-black-14px">Name</div>
                <div class="explorer-last-modified valign-text-middle poppins-light-black-14px">Last Modified</div>
                <div class="size valign-text-middle poppins-light-black-14px">Size</div>
            </div>
            <div class="explorer-data">
                {fileList.map(item => {
                    return <FileComponent
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