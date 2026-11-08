import React from 'react'
import './Navbar.css'
const Navbar = () => {
  return (
    <div className="navbar">
      <div className="nav-logo"><h2>Student Dashboard</h2></div>
      
      {/* Logout is just a visual button for now */}
      <button className="logout-btn" onClick={() => alert("Logging out...")}>
        Logout
      </button>
    </div>
  )
}

export default Navbar