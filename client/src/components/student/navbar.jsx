import React from 'react'
import { NavLink } from 'react-router-dom'
import { cn } from '../../lib/utils'

const navItems = [
  { name: 'Home', path: '/student/home' },
  { name: 'Tech Event', path: '/student/techevent' },
  { name: 'Non-Tech Event', path: '/student/nontechevent' },
  { name: 'Merchendise', path: '/student/merchendise' },
  { name: 'Dashboard', path: '/student/dashboard' },
]

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md py-4 px-6 flex items-center justify-between">
      <h1 className="text-xl font-bold">Student Portal</h1>
      <div className="space-x-4">
        {navItems.map(({ name, path }) => (
          <NavLink
            key={name}
            to={path}
            className={({ isActive }) =>
              cn(
                'text-sm font-medium transition-colors hover:text-primary',
                isActive ? 'text-primary underline underline-offset-4' : 'text-muted-foreground'
              )
            }
          >
            {name}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}

export default Navbar