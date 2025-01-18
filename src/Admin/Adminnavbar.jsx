import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaHome, FaImage, FaTasks, FaUsers, FaUserPlus, FaProjectDiagram, FaShieldAlt } from 'react-icons/fa';
import { Menu, User, LayoutDashboard, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

// Admin Navbar Component
const Adminnavbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = async () => {
    try {
      const response = await axios.post(
        'https://sods-admin.up.railway.app/api/admin/logout',
        {},
        { withCredentials: true }
      );

      if (response.status === 200) {
        logout();
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
        navigate("/");
      } else {
        console.error('Failed to logout:', response.statusText);
        alert('Logout failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during logout:', error.message);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <nav className="w-64 h-screen bg-gray-900 fixed left-0 top-0 border-r border-gray-800">
      <div className="flex flex-col h-full">
        {/* Header */}
        <header className="p-6 border-b border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Menu className="w-6 h-2 text-primary-500" />
            <h1 className="text-xl font-bold text-white">Admin</h1>
          </div>
        </header>

        {/* User Info */}
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
              <User className="w-5 h-5 text-gray-300" />
            </div>
            <div>
              <h2 className="text-sm font-medium text-white">Welcome</h2>
              <p className="text-xs text-gray-200">Admin</p>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 py-6 space-y-1 px-3 text-gray-100 overflow-y-auto">
          <div className="space-y-2 px-3">
            <NavItem icon={FaHome} text="Home" to="/adminhome" />
            <NavItem icon={FaImage} text="Gallery" to="/addeventphoto" />
            <NavItem icon={FaTasks} text="Activities" to="/allactivities" />
            <NavItem icon={LayoutDashboard} text="Add Activity" to="/addactivity" />
            <NavItem icon={FaUsers} text="Team Members" to="/teammembers" />
            <NavItem icon={FaUserPlus} text="Add Member" to="/addmember" />
            <NavItem icon={FaProjectDiagram} text="Projects" to="/allprojects" />
            <NavItem icon={FaShieldAlt} text="Admins" to="/alladmins" />
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-indigo-700">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 p-3 rounded-lg text-red-200 hover:bg-red-900/50 transition-colors"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

// Navigation Item Component
const NavItem = ({ icon: Icon, text, to }) => {
  return (
    <Link
      to={to}
      className="flex items-center gap-3 p-3 rounded-lg hover:bg-indigo-700/50 transition-colors"
    >
      <Icon size={20} />
      <span>{text}</span>
    </Link>
  );
};

export default Adminnavbar;
