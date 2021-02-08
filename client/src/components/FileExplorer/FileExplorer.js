import React from 'react';
import SideBar from '../Dashboard/SideBar/Sidebar'
import ExplorerMenu from './ExplorerMenu/ExplorerMenu';

const FileExplorer = () => {
    return (
        <div class="FileExplorer">
            <SideBar></SideBar>
            <ExplorerMenu></ExplorerMenu>
        </div>
    )
}

export default FileExplorer;