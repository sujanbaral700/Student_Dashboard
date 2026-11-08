import React from 'react'
import './Overview.css'

const Overview = ({ students = [] }) => {
  const total = students.length
  const passed = students.filter((s) => s.status === 'Pass').length
  const failed = students.filter((s) => s.status === 'Fail').length

  return (
    <div className="overview-container">
      <h1>Overview</h1>
      <div className="stat-cards">
        <div className="stat-card">
          <span className="stat-label">Total Students</span>
          <span className="stat-value">{total}</span>
        </div>
        <div className="stat-card pass">
          <span className="stat-label">Passed</span>
          <span className="stat-value">{passed}</span>
        </div>
        <div className="stat-card fail">
          <span className="stat-label">Failed</span>
          <span className="stat-value">{failed}</span>
        </div>
      </div>
    </div>
  )
}

export default Overview
