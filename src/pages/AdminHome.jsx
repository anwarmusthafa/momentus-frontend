import React from 'react'
import AdminSidebar from "../components/Layout/AdminSidebar"
import AdminDashboard from '../components/Admin/AdminDashboard'

function AdminHome() {
  return (
    <div>
      <AdminSidebar/>
      <AdminDashboard/>

    </div>
  )
}

export default AdminHome
