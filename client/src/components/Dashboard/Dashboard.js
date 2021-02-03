import React from 'react'
import FilesMenu from './FilesMenu/FilesMenu'
import Sidebar from './SideBar/Sidebar'

const Dashboard = () => {
    return (
        <div className="dashboardMain">
            <Sidebar />
            <FilesMenu />
        </div>
    )
}

export default Dashboard;