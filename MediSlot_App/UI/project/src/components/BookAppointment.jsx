import { useState, useEffect } from 'react';
import { Row, Col, Card, Form, Button, Alert, Badge, Table } from 'react-bootstrap';

const BookAppointment = () => {
  // State management
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVariant, setAlertVariant] = useState('success');

  // Form data state
  const [formData, setFormData] = useState({
    appointment_patient: '',
    appointment_doctor: '',
    appointment_date: '',
    appointment_time: '',
    reason: '',
  });

  // Available time slots
  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
  ];

  // Fetch appointments on component mount
  useEffect(() => {
    fetchAppointments();
  }, []);

  // Fetch appointments from backend
  const fetchAppointments = async () => {
    try {
      const response = await fetch('http://localhost:8084/api/appointments');
      const data = await response.json();
      setAppointments(data.map(appt => ({
        ...appt,
        appointment_slot: `${appt.appointment_date} ${appt.appointment_time}`,
        status: appt.status || 'Scheduled'
      })));
    } catch (error) {
      showAlertMessage('Failed to fetch appointments', 'danger');
    }
  };

  // Handle form submission for new appointment
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validate required fields
    if (!formData.appointment_patient || !formData.appointment_doctor || 
        !formData.appointment_date || !formData.appointment_time) {
      showAlertMessage('Please fill all required fields', 'danger');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:8084/api/appointment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error('Booking failed');

      const newAppointment = await response.json();
      
      // Update UI with new appointment
      setAppointments(prev => [...prev, {
        ...newAppointment,
        appointment_slot: `${newAppointment.appointment_date} ${newAppointment.appointment_time}`,
        status: 'Scheduled'
      }]);

      // Reset form
      setFormData({
        appointment_patient: '',
        appointment_doctor: '',
        appointment_date: '',
        appointment_time: '',
        reason: '',
      });

      showAlertMessage('Appointment booked successfully!', 'success');
    } catch (error) {
      showAlertMessage('Failed to book appointment', 'danger');
    } finally {
      setLoading(false);
    }
  };

  // Handle appointment deletion
  const handleDelete = async (appointmentId) => {
    if (!window.confirm('Are you sure you want to delete this appointment?')) return;
    
    setDeletingId(appointmentId);
    try {
      const response = await fetch(`http://localhost:8084/api/appointment/${appointmentId}`, {
        method: 'DELETE'
      });

      if (!response.ok) throw new Error('Deletion failed');

      // Remove deleted appointment from state
      setAppointments(prev => prev.filter(appt => appt.appointment_id !== appointmentId));
      showAlertMessage('Appointment deleted successfully!', 'success');
    } catch (error) {
      showAlertMessage('Failed to delete appointment', 'danger');
    } finally {
      setDeletingId(null);
    }
  };

  // Helper function to show alert messages
  const showAlertMessage = (message, variant) => {
    setAlertMessage(message);
    setAlertVariant(variant);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="p-3">
      <h2 className="mb-4">Appointment Management</h2>

      {/* Alert notifications */}
      {showAlert && (
        <Alert variant={alertVariant} onClose={() => setShowAlert(false)} dismissible>
          {alertMessage}
        </Alert>
      )}

      <Row>
        <Col lg={8}>
          {/* Appointment Booking Form */}
          <Card className="mb-4 shadow-sm">
            <Card.Header className="bg-primary text-white">
              <h5>Book New Appointment</h5>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Patient Name *</Form.Label>
                      <Form.Control
                        type="text"
                        name="appointment_patient"
                        value={formData.appointment_patient}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter patient name"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Doctor Name *</Form.Label>
                      <Form.Control
                        type="text"
                        name="appointment_doctor"
                        value={formData.appointment_doctor}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter doctor name"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Date *</Form.Label>
                      <Form.Control
                        type="date"
                        name="appointment_date"
                        value={formData.appointment_date}
                        onChange={handleInputChange}
                        min={new Date().toISOString().split('T')[0]}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Time *</Form.Label>
                      <Form.Select
                        name="appointment_time"
                        value={formData.appointment_time}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select time slot</option>
                        {timeSlots.map(time => (
                          <option key={time} value={time}>{time}</option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Reason for Visit</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="reason"
                    value={formData.reason}
                    onChange={handleInputChange}
                    placeholder="Optional: Describe your reason for the appointment"
                  />
                </Form.Group>

                <div className="d-flex justify-content-end">
                  <Button 
                    variant="primary" 
                    type="submit" 
                    disabled={loading}
                  >
                    {loading ? 'Booking...' : 'Book Appointment'}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>

          {/* Appointments List */}
          <Card className="shadow-sm">
            <Card.Header className="bg-info text-white">
              <h5>Recent Appointments</h5>
            </Card.Header>
            <Card.Body>
              {appointments.length === 0 ? (
                <div className="text-center py-4">
                  <p className="text-muted">No appointments booked yet</p>
                </div>
              ) : (
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Patient</th>
                      <th>Doctor</th>
                      <th>Date & Time</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments.map((appt, index) => (
                      <tr key={appt.appointment_id}>
                        <td>{index + 1}</td>
                        <td>{appt.appointment_patient}</td>
                        <td>{appt.appointment_doctor}</td>
                        <td>{appt.appointment_slot}</td>
                        <td>
                          <Badge bg={appt.status === 'Cancelled' ? 'danger' : 'success'}>
                            {appt.status}
                          </Badge>
                        </td>
                        <td>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => handleDelete(appt.appointment_id)}
                            disabled={deletingId === appt.appointment_id}
                          >
                            {deletingId === appt.appointment_id ? (
                              <span>Deleting...</span>
                            ) : (
                              <span>Delete</span>
                            )}
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default BookAppointment;