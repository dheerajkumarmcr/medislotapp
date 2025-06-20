import { useState } from 'react'
import { Row, Col, Card, Table, Badge, Button, Modal, Alert } from 'react-bootstrap'
import { appointments, doctors } from '../data/dummyData'
import { useAuth } from '../context/AuthContext'

const PatientAppointments = () => {
  const { patient } = useAuth()
  const [selectedAppointment, setSelectedAppointment] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')

  // Filter appointments for current patient
  const patientAppointments = appointments.filter(apt => apt.patient_id === patient?.patientid)

  const getDoctorName = (doctorId) => {
    const doctor = doctors.find(d => d.doctor_id === doctorId)
    return doctor ? doctor.doctor_name : 'Unknown Doctor'
  }

  const getDoctorDetails = (doctorId) => {
    return doctors.find(d => d.doctor_id === doctorId)
  }

  const getStatusColor = (status) => {
    const colors = {
      'Scheduled': 'primary',
      'Completed': 'success',
      'Cancelled': 'danger',
      'In Progress': 'warning'
    }
    return colors[status] || 'secondary'
  }

  const handleViewDetails = (appointment) => {
    setSelectedAppointment(appointment)
    setShowModal(true)
  }

  const handleCancelAppointment = (appointmentId) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      // In a real app, this would update the backend
      setAlertMessage('Appointment cancelled successfully')
      setShowAlert(true)
      setShowModal(false)
      setTimeout(() => setShowAlert(false), 3000)
    }
  }

  const isUpcoming = (appointmentSlot) => {
    return new Date(appointmentSlot) > new Date()
  }

  const upcomingAppointments = patientAppointments.filter(apt => isUpcoming(apt.appointment_slot))
  const pastAppointments = patientAppointments.filter(apt => !isUpcoming(apt.appointment_slot))

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">My Appointments</h2>
        <Badge bg="info" className="fs-6">
          Total: {patientAppointments.length} appointments
        </Badge>
      </div>

      {showAlert && (
        <Alert variant="success" dismissible onClose={() => setShowAlert(false)}>
          {alertMessage}
        </Alert>
      )}

      {/* Statistics Cards */}
      <Row className="mb-4">
        <Col md={3}>
          <Card className="border-0 shadow-sm">
            <Card.Body className="text-center">
              <i className="bi bi-calendar-check text-primary" style={{ fontSize: '2rem' }}></i>
              <h4 className="mt-2 mb-1">{patientAppointments.length}</h4>
              <p className="text-muted mb-0">Total Appointments</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="border-0 shadow-sm">
            <Card.Body className="text-center">
              <i className="bi bi-clock text-warning" style={{ fontSize: '2rem' }}></i>
              <h4 className="mt-2 mb-1">{upcomingAppointments.length}</h4>
              <p className="text-muted mb-0">Upcoming</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="border-0 shadow-sm">
            <Card.Body className="text-center">
              <i className="bi bi-check-circle text-success" style={{ fontSize: '2rem' }}></i>
              <h4 className="mt-2 mb-1">{patientAppointments.filter(a => a.status === 'Completed').length}</h4>
              <p className="text-muted mb-0">Completed</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="border-0 shadow-sm">
            <Card.Body className="text-center">
              <i className="bi bi-calendar-event text-info" style={{ fontSize: '2rem' }}></i>
              <h4 className="mt-2 mb-1">
                {patientAppointments.filter(a => 
                  new Date(a.appointment_slot).toDateString() === new Date().toDateString()
                ).length}
              </h4>
              <p className="text-muted mb-0">Today</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Upcoming Appointments */}
      <Card className="border-0 shadow-sm mb-4">
        <Card.Header className="bg-white border-bottom">
          <h5 className="mb-0">
            <i className="bi bi-calendar-event me-2"></i>
            Upcoming Appointments ({upcomingAppointments.length})
          </h5>
        </Card.Header>
        <Card.Body className="p-0">
          <div className="table-responsive">
            <Table hover className="mb-0">
              <thead className="bg-light">
                <tr>
                  <th>Date & Time</th>
                  <th>Doctor</th>
                  <th>Department</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {upcomingAppointments.map((appointment) => {
                  const doctor = getDoctorDetails(appointment.doctor_id)
                  return (
                    <tr key={appointment.appointment_id}>
                      <td>
                        <div>
                          <div className="fw-semibold">
                            {new Date(appointment.appointment_slot).toLocaleDateString()}
                          </div>
                          <small className="text-muted">
                            {new Date(appointment.appointment_slot).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                          </small>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="bg-success bg-opacity-10 rounded-circle p-2 me-2">
                            <i className="bi bi-person-badge text-success"></i>
                          </div>
                          {getDoctorName(appointment.doctor_id)}
                        </div>
                      </td>
                      <td>
                        <Badge bg="primary">{doctor?.doctor_dept}</Badge>
                      </td>
                      <td>
                        <Badge bg={getStatusColor(appointment.status)}>
                          {appointment.status}
                        </Badge>
                      </td>
                      <td>
                        <div className="d-flex gap-2">
                          <Button
                            variant="outline-primary"
                            size="sm"
                            onClick={() => handleViewDetails(appointment)}
                          >
                            <i className="bi bi-eye"></i>
                          </Button>
                          {appointment.status === 'Scheduled' && (
                            <Button
                              variant="outline-danger"
                              size="sm"
                              onClick={() => handleCancelAppointment(appointment.appointment_id)}
                            >
                              <i className="bi bi-x-circle"></i>
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </Table>
          </div>
          {upcomingAppointments.length === 0 && (
            <div className="text-center py-4">
              <i className="bi bi-calendar-x text-muted" style={{ fontSize: '2rem' }}></i>
              <p className="text-muted mt-2 mb-0">No upcoming appointments</p>
            </div>
          )}
        </Card.Body>
      </Card>

      {/* Past Appointments */}
      <Card className="border-0 shadow-sm">
        <Card.Header className="bg-white border-bottom">
          <h5 className="mb-0">
            <i className="bi bi-clock-history me-2"></i>
            Past Appointments ({pastAppointments.length})
          </h5>
        </Card.Header>
        <Card.Body className="p-0">
          <div className="table-responsive">
            <Table hover className="mb-0">
              <thead className="bg-light">
                <tr>
                  <th>Date & Time</th>
                  <th>Doctor</th>
                  <th>Department</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {pastAppointments.map((appointment) => {
                  const doctor = getDoctorDetails(appointment.doctor_id)
                  return (
                    <tr key={appointment.appointment_id}>
                      <td>
                        <div>
                          <div className="fw-semibold">
                            {new Date(appointment.appointment_slot).toLocaleDateString()}
                          </div>
                          <small className="text-muted">
                            {new Date(appointment.appointment_slot).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                          </small>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="bg-success bg-opacity-10 rounded-circle p-2 me-2">
                            <i className="bi bi-person-badge text-success"></i>
                          </div>
                          {getDoctorName(appointment.doctor_id)}
                        </div>
                      </td>
                      <td>
                        <Badge bg="secondary">{doctor?.doctor_dept}</Badge>
                      </td>
                      <td>
                        <Badge bg={getStatusColor(appointment.status)}>
                          {appointment.status}
                        </Badge>
                      </td>
                      <td>
                        <Button
                          variant="outline-primary"
                          size="sm"
                          onClick={() => handleViewDetails(appointment)}
                        >
                          <i className="bi bi-eye"></i>
                        </Button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </Table>
          </div>
          {pastAppointments.length === 0 && (
            <div className="text-center py-4">
              <i className="bi bi-clock-history text-muted" style={{ fontSize: '2rem' }}></i>
              <p className="text-muted mt-2 mb-0">No past appointments</p>
            </div>
          )}
        </Card.Body>
      </Card>

      {/* Appointment Details Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            <i className="bi bi-calendar-check me-2"></i>
            Appointment Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedAppointment && (
            <div>
              <Row className="mb-3">
                <Col md={6}>
                  <strong>Date & Time:</strong>
                  <p className="mb-0">
                    {new Date(selectedAppointment.appointment_slot).toLocaleDateString()} at{' '}
                    {new Date(selectedAppointment.appointment_slot).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </p>
                </Col>
                <Col md={6}>
                  <strong>Status:</strong>
                  <div>
                    <Badge bg={getStatusColor(selectedAppointment.status)}>
                      {selectedAppointment.status}
                    </Badge>
                  </div>
                </Col>
              </Row>
              
              {(() => {
                const doctorDetails = getDoctorDetails(selectedAppointment.doctor_id)
                return doctorDetails ? (
                  <div className="mb-3">
                    <strong>Doctor Information:</strong>
                    <div className="mt-2 p-3 bg-light rounded">
                      <p className="mb-1"><strong>Name:</strong> {doctorDetails.doctor_name}</p>
                      <p className="mb-1"><strong>Department:</strong> {doctorDetails.doctor_dept}</p>
                      <p className="mb-1"><strong>Email:</strong> {doctorDetails.doctor_mail}</p>
                      <p className="mb-0"><strong>About:</strong> {doctorDetails.doctor_desc}</p>
                    </div>
                  </div>
                ) : null
              })()}

              {selectedAppointment.status === 'Scheduled' && isUpcoming(selectedAppointment.appointment_slot) && (
                <div className="mb-3">
                  <strong>Actions:</strong>
                  <div className="mt-2">
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleCancelAppointment(selectedAppointment.appointment_id)}
                    >
                      <i className="bi bi-x-circle me-1"></i>
                      Cancel Appointment
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default PatientAppointments