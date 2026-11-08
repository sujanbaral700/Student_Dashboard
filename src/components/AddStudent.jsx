import React, { useState } from 'react'
import './AddStudent.css'

const emptyForm = {
  name: '',
  roll: '',
  year: '',
  sem: '',
  program: '',
  status: '',
}

// Used for both "Add" (no initialData) and "Edit" (initialData provided).
const AddStudent = ({ onClose, onSave, initialData = null, existingRolls = [] }) => {
  const isEdit = Boolean(initialData)
  const [form, setForm] = useState(initialData ? { ...emptyForm, ...initialData } : emptyForm)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const cleaned = {
      ...form,
      name: form.name.trim(),
      roll: form.roll.trim(),
      year: form.year.trim(),
      sem: form.sem.trim(),
      program: form.program.trim(),
    }

    if (!cleaned.name || !cleaned.roll || !cleaned.status) {
      setError('Please fill the required fields (Name, Roll No, Status).')
      return
    }

    if (existingRolls.includes(cleaned.roll)) {
      setError(`Roll No "${cleaned.roll}" already exists.`)
      return
    }

    onSave(cleaned)
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{isEdit ? 'Edit Student' : 'Add New Student'}</h2>

        <form onSubmit={handleSubmit}>
          <div className="input-section">
            <label htmlFor="name">Name *</label>
            <input type="text" id="name" name="name" value={form.name} onChange={handleChange} autoFocus />

            <label htmlFor="roll">Roll No *</label>
            <input type="text" id="roll" name="roll" value={form.roll} onChange={handleChange} />

            <label htmlFor="year">Year</label>
            <input type="text" id="year" name="year" value={form.year} onChange={handleChange} />

            <label htmlFor="sem">Semester</label>
            <input type="text" id="sem" name="sem" value={form.sem} onChange={handleChange} />

            <label htmlFor="program">Program</label>
            <input type="text" id="program" name="program" value={form.program} onChange={handleChange} />

            <label htmlFor="status">Status *</label>
            <select id="status" name="status" value={form.status} onChange={handleChange}>
              <option value="">Select status</option>
              <option value="Pass">Pass</option>
              <option value="Fail">Fail</option>
            </select>
          </div>

          {error && <p className="form-error">{error}</p>}

          <div className="modal-buttons">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="save-btn">
              {isEdit ? 'Save Changes' : 'Add Student'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddStudent
