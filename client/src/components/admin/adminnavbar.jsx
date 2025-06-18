import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminNavbar = () => {
  return (
    <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-blue-600">Admin Panel</h1>
      <div className="space-x-6">
        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) =>
            isActive ? 'text-blue-600 font-semibold' : 'text-gray-700'
          }
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/admin/event"
          className={({ isActive }) =>
            isActive ? 'text-blue-600 font-semibold' : 'text-gray-700'
          }
        >
          Events
        </NavLink>
        <NavLink
          to="/admin/merch"
          className={({ isActive }) =>
            isActive ? 'text-blue-600 font-semibold' : 'text-gray-700'
          }
        >
          Merchandise
        </NavLink>
        <NavLink
          to="/admin/studentinfo"
          className={({ isActive }) =>
            isActive ? 'text-blue-600 font-semibold' : 'text-gray-700'
          }
        >
          Student Info
        </NavLink>
      </div>
    </nav>
  );
};

export default AdminNavbar;
