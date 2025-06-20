import { useEffect, useState } from 'react'
import { Row, Col, Card, Table, Button, Form, Modal, Alert, Badge, Spinner } from 'react-bootstrap'

const BASE_URL = 'http://localhost:8083/api'

const ManageDoctors = () => {
  const [doctors, setDoctors] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editingDoctor, setEditingDoctor] = useState(null)
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [loading, setLoading] = useState(true)

  const [formData, setFormData] = useState({
    doctor_name: '',
    doctor_dept: '',
    doctor_mail: '',
    doctor_desc: '',
    doctor_password: ''
  })

  const departments = ['Cardiology', 'Neurology', 'Pediatrics', 'Orthopedics', 'Dermatology', 'General Medicine', 'Surgery']

  const fetchDoctors = async () => {
    try {
      setLoading(true)
      const res = await fetch(`${BASE_URL}/doctors`)
      if (res.ok) {
        const data = await res.json()
        if (Array.isArray(data)) {
          setDoctors(data)
        } else {
          throw new Error('Unexpected API response format')
        }
      } else {
        console.error('Failed to fetch doctors')
      }
    } catch (err) {
      console.error('Error fetching doctors:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDoctors()
  }, [])

  const filteredDoctors = doctors.filter((d) =>
    d.doctor_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.doctor_dept?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.doctor_mail?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleEdit = (doctor) => {
    setEditingDoctor(doctor)
    setFormData({
      doctor_name: doctor.doctor_name,
      doctor_dept: doctor.doctor_dept,
      doctor_mail: doctor.doctor_mail,
      doctor_desc: doctor.doctor_desc,
      doctor_password: doctor.doctor_password || ''
    })
    setShowModal(true)
  }

  const handleAdd = () => {
    setEditingDoctor(null)
    setFormData({
      doctor_name: '',
      doctor_dept: '',
      doctor_mail: '',
      doctor_desc: '',
      doctor_password: ''
    })
    setShowModal(true)
  }

  const handleSave = async () => {
    const url = editingDoctor
      ? `${BASE_URL}/doctor/${editingDoctor.doctor_id}`
      : `${BASE_URL}/doctor`

    const method = editingDoctor ? 'PUT' : 'POST'

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (res.ok) {
        setAlertMessage(editingDoctor ? 'Doctor updated!' : 'Doctor added!')
        setShowAlert(true)
        setShowModal(false)
        fetchDoctors()
        setTimeout(() => setShowAlert(false), 3000)
      } else {
        console.error('Failed to save doctor')
      }
    } catch (err) {
      console.error('Error saving doctor:', err)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this doctor?')) return
    try {
      const res = await fetch(`${BASE_URL}/doctor/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setAlertMessage('Doctor deleted!')
        setShowAlert(true)
        fetchDoctors()
        setTimeout(() => setShowAlert(false), 3000)
      } else {
        console.error('Delete failed')
      }
    } catch (err) {
      console.error('Error deleting doctor:', err)
    }
  }

  const getDepartmentColor = (dept) => {
    const map = {
      'Cardiology': 'danger',
      'Neurology': 'primary',
      'Pediatrics': 'success',
      'Orthopedics': 'warning',
      'Dermatology': 'info',
      'General Medicine': 'secondary',
      'Surgery': 'dark'
    }
    return map[dept] || 'secondary'
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Manage Doctors</h2>
        <Button variant="primary" onClick={handleAdd}>
          <i className="bi bi-person-plus me-2"></i>
          Add New Doctor
        </Button>
      </div>

      {showAlert && (
        <Alert variant="success" dismissible onClose={() => setShowAlert(false)}>
          {alertMessage}
        </Alert>
      )}

      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" variant="primary" />
          <p className="mt-3 text-muted">Loading doctors...</p>
        </div>
      ) : (
        <Card className="border-0 shadow-sm">
          <Card.Header className="bg-white border-bottom">
            <Row className="align-items-center">
              <Col md={6}>
                <h5 className="mb-0">Doctors List ({filteredDoctors.length})</h5>
              </Col>
              <Col md={6}>
                <Form.Control
                  type="text"
                  placeholder="Search doctors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </Col>
            </Row>
          </Card.Header>
          <Card.Body className="p-0">
            <div className="table-responsive">
              <Table hover className="mb-0">
                <thead className="bg-light">
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Department</th>
                    <th>Email</th>
                    <th>Description</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDoctors.length > 0 ? (
                    filteredDoctors.map((doctor) => (
                      <tr key={doctor.doctor_id}>
                        <td>{doctor.doctor_id}</td>
                        <td>{doctor.doctor_name}</td>
                        <td>
                          <Badge bg={getDepartmentColor(doctor.doctor_dept)}>
                            {doctor.doctor_dept}
                          </Badge>
                        </td>
                        <td>{doctor.doctor_mail}</td>
                        <td>{doctor.doctor_desc?.slice(0, 50)}...</td>
                        <td>
                          <div className="d-flex gap-2">
                            <Button variant="outline-primary" size="sm" onClick={() => handleEdit(doctor)}>
                              <i className="bi bi-pencil"></i>
                            </Button>
                            <Button variant="outline-danger" size="sm" onClick={() => handleDelete(doctor.doctor_id)}>
                              <i className="bi bi-trash"></i>
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center text-muted">
                        No doctors found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          </Card.Body>
        </Card>
      )}

      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{editingDoctor ? 'Edit Doctor' : 'Add New Doctor'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Doctor Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.doctor_name}
                    onChange={(e) => setFormData({ ...formData, doctor_name: e.target.value })}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Department</Form.Label>
                  <Form.Select
                    value={formData.doctor_dept}
                    onChange={(e) => setFormData({ ...formData, doctor_dept: e.target.value })}
                    required
                  >
                    <option value="">Select Department</option>
                    {departments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={formData.doctor_mail}
                onChange={(e) => setFormData({ ...formData, doctor_mail: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={formData.doctor_desc}
                onChange={(e) => setFormData({ ...formData, doctor_desc: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={formData.doctor_password}
                onChange={(e) => setFormData({ ...formData, doctor_password: e.target.value })}
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleSave}>
            {editingDoctor ? 'Update Doctor' : 'Add Doctor'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default ManageDoctors
