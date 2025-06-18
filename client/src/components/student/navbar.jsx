import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { cn } from '../../lib/utils';

const navItems = [
  { name: 'Home', path: '/student/home' },
  { name: 'Tech Event', path: '/student/techevent' },
  { name: 'Non-Tech Event', path: '/student/nontechevent' },
  { name: 'Merchandise', path: '/student/merchendise' },
  { name: 'Dashboard', path: '/student/dashboard' },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Brand */}
          <div className="flex-shrink-0 text-2xl font-bold text-purple-600">
            Student Portal
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-6">
            {navItems.map(({ name, path }) => (
              <NavLink
                key={name}
                to={path}
                className={({ isActive }) =>
                  cn(
                    'text-sm font-medium transition-colors duration-200',
                    isActive
                      ? 'text-purple-600 underline underline-offset-4'
                      : 'text-gray-600 hover:text-purple-500'
                  )
                }
              >
                {name}
              </NavLink>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-700 hover:text-purple-600 focus:outline-none"
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {menuOpen && (
        <div className="md:hidden px-4 pt-2 pb-4 space-y-2 bg-white shadow-lg border-t">
          {navItems.map(({ name, path }) => (
            <NavLink
              key={name}
              to={path}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                cn(
                  'block text-base font-medium transition-colors duration-200',
                  isActive
                    ? 'text-purple-600 underline underline-offset-4'
                    : 'text-gray-700 hover:text-purple-500'
                )
              }
            >
              {name}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
