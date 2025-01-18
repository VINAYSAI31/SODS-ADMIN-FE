import React, { useState } from 'react';
import axios from 'axios';
import {
  FaHome,
  FaImage,
  FaTasks,
  FaUsers,
  FaUserPlus,
  FaProjectDiagram,
  FaShieldAlt,
} from 'react-icons/fa';
import { Menu, User, LayoutDashboard, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const Adminnavbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
        navigate('/');
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
    <nav className="bg-gray-900 text-gray-100 fixed top-0 left-0 w-full sm:w-64 h-full sm:h-auto sm:static border-gray-800">
      <div className="flex flex-col sm:h-full">
        {/* Mobile Header */}
        <header className="flex justify-between items-center p-4 sm:hidden border-b border-gray-800">
          <h1 className="text-lg font-bold">Admin</h1>
          <button
            className="text-gray-100 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </header>

        {/* Sidebar Menu */}
        <div
          className={`sm:flex sm:flex-col transition-transform duration-300 transform ${
            isMenuOpen ? 'translate-x-0' : '-translate-x-full'
          } sm:translate-x-0 sm:w-64 h-screen bg-gray-900 fixed top-0 left-0 z-50`}
        >
          {/* Header */}
          <header className="p-6 border-b border-gray-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Menu className="w-6 h-6 text-primary-500 hidden sm:block" />
              <h1 className="text-xl font-bold text-white">Admin</h1>
            </div>
          </header>

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
          <div className="py-6 space-y-1 px-3 text-gray-100">
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

        {/* Overlay for Mobile */}
        {isMenuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 sm:hidden"
            onClick={() => setIsMenuOpen(false)}
          ></div>
        )}
      </div>
    </nav>
  );
};

const NavItem = ({ icon: Icon, text, to }) => (
  <Link
    to={to}
    className="flex items-center gap-3 p-3 rounded-lg hover:bg-indigo-700/50 transition-colors"
  >
    <Icon size={20} />
    <span>{text}</span>
  </Link>
);

export default Adminnavbar;
