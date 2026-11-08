import React, { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import Footer from './components/Footer'
import Overview from './components/Overview'
import Details from './components/Details'
import './App.css'

const initialStudents = [
  { id: 1, name: 'John Doe', roll: '101', year: '2023', sem: '4th', program: 'CS', status: 'Pass' },
  { id: 2, name: 'Jane Smith', roll: '102', year: '2023', sem: '4th', program: 'CS', status: 'Fail' },
  { id: 3, name: 'Mike Ross', roll: '105', year: '2022', sem: '6th', program: 'Law', status: 'Pass' },
]

const App = () => {
  // Students live here so both Overview and Details share the same data.
  const [students, setStudents] = useState(initialStudents)

  return (
    <div className="app-container">
      <Navbar />
      <Sidebar />

      <div className="content-wrapper">
        <Routes>
          <Route path="/" element={<Navigate to="/overview" replace />} />
          <Route path="/overview" element={<Overview students={students} />} />
          <Route
            path="/details"
            element={<Details students={students} setStudents={setStudents} />}
          />
          <Route path="*" element={<Navigate to="/overview" replace />} />
        </Routes>
      </div>

      <div className="footer-content">
        <Footer />
      </div>
    </div>
  )
}

export default App
