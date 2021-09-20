import React from 'react';
import SideBar from '../../components/SideBar/Sidebar2'
import ExplorerMenu from './ExplorerMenu/ExplorerMenu';

const FileExplorer = () => {
    return (
        <div className="FileExplorer">
            <SideBar></SideBar>
            <ExplorerMenu></ExplorerMenu>
        </div>
    )
}

export default FileExplorer;