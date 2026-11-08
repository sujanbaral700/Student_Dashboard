import React from 'react'
import './Sidebar.css'
import { NavLink } from 'react-router-dom'

// NavLink adds the "active" state itself from the current URL,
// so no extra state is needed (and refreshing the page keeps the highlight).
const Sidebar = () => {
  const linkClass = ({ isActive }) => `menuitem ${isActive ? 'active' : ''}`

  return (
    <div className="sidebar">
      <nav className="sidebar-menu">
        <NavLink to="/overview" className={linkClass}>Overview</NavLink>
        <NavLink to="/details" className={linkClass}>Details</NavLink>
      </nav>
    </div>
  )
}

export default Sidebar
