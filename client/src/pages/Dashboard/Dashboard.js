import React from 'react'
import FilesMenu2 from './FilesMenu/FilesMenu2'
import Sidebar2 from '../../components/SideBar/Sidebar2'

const Dashboard = () => {
    return (
        <div className="dashboardMain">
            <Sidebar2 />
            <FilesMenu2 />
        </div>
    )
}

export default Dashboard;