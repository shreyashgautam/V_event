// src/layouts/StudentLayout.jsx
import React from 'react'
import Navbar from './navbar'
import { Outlet } from 'react-router-dom'

const StudentLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  )
}

export default StudentLayout