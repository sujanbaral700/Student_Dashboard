import React, { useState } from 'react'
import AddStudent from './AddStudent'
import './Details.css'
import './AddStudent.css'

const Details = ({ students, setStudents }) => {
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [mode, setMode] = useState(null) // "add" | "view" | "edit" | null

  const closeModal = () => {
    setMode(null)
    setSelectedStudent(null)
  }

  // ADD
  const handleAdd = (newStudent) => {
    // Unique id even after deletions (students.length + 1 could repeat).
    const nextId = students.reduce((max, s) => Math.max(max, s.id), 0) + 1
    setStudents([...students, { ...newStudent, id: nextId }])
    closeModal()
  }

  // EDIT
  const handleEditSave = (updated) => {
    setStudents(
      students.map((s) => (s.id === selectedStudent.id ? { ...updated, id: s.id } : s))
    )
    closeModal()
  }

  // DELETE
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      setStudents(students.filter((s) => s.id !== id))
    }
  }

  const handleView = (student) => {
    setSelectedStudent(student)
    setMode('view')
  }

  const handleEdit = (student) => {
    setSelectedStudent(student)
    setMode('edit')
  }

  // Roll numbers that are already taken (excluding the one being edited).
  const takenRolls = students
    .filter((s) => !selectedStudent || s.id !== selectedStudent.id)
    .map((s) => s.roll)

  return (
    <div className="details-container">
      <div className="details-header">
        <h1>Student Details</h1>
        <button className="add-btn" onClick={() => setMode('add')}>
          Add Student
        </button>
      </div>

      <div className="table-wrapper">
        <table className="student-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Roll</th>
              <th>Year</th>
              <th>Sem</th>
              <th>Program</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.length === 0 && (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center' }}>No students yet.</td>
              </tr>
            )}
            {students.map((student) => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.roll}</td>
                <td>{student.year}</td>
                <td>{student.sem}</td>
                <td>{student.program}</td>
                <td>
                  <span className={`status-badge ${(student.status || '').toLowerCase()}`}>
                    {student.status}
                  </span>
                </td>
                <td>
                  <div className="action-cell">
                    <button className="action-btn view-btn" onClick={() => handleView(student)}>👁️</button>
                    <button className="action-btn edit-btn" onClick={() => handleEdit(student)}>✏️</button>
                    <button className="action-btn delete-btn" onClick={() => handleDelete(student.id)}>🗑️</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODALS */}
      {mode === 'add' && (
        <AddStudent onSave={handleAdd} onClose={closeModal} existingRolls={takenRolls} />
      )}

      {mode === 'edit' && selectedStudent && (
        <AddStudent
          initialData={selectedStudent}
          onSave={handleEditSave}
          onClose={closeModal}
          existingRolls={takenRolls}
        />
      )}

      {mode === 'view' && selectedStudent && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Student Details</h2>
            <p className="view-row"><b>Name:</b> {selectedStudent.name}</p>
            <p className="view-row"><b>Roll:</b> {selectedStudent.roll}</p>
            <p className="view-row"><b>Year:</b> {selectedStudent.year}</p>
            <p className="view-row"><b>Semester:</b> {selectedStudent.sem}</p>
            <p className="view-row"><b>Program:</b> {selectedStudent.program}</p>
            <p className="view-row"><b>Status:</b> {selectedStudent.status}</p>
            <div className="modal-buttons">
              <button className="cancel-btn" onClick={closeModal}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Details
