import React from 'react'
import FilesMenu from './FilesMenu/FilesMenu'
import Sidebar2 from './SideBar/Sidebar2'

const Dashboard = () => {
    return (
        <div className="dashboardMain">
            <Sidebar2 />
            <FilesMenu />
        </div>
    )
}

export default Dashboard;