import React from 'react'
import AdminSidebar from "../components/Layout/AdminSidebar"
import UserManagement from "../components/Admin/UserManagement"

function UserManagementPage() {
  return (
    <div>
      <AdminSidebar/>
     <UserManagement/>
    </div>
  )
}

export default UserManagementPage
