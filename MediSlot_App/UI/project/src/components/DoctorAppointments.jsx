import { useState, useEffect } from 'react';
import {
  Card,
  Row,
  Col,
  Form,
  Badge,
  Button,
  Modal,
  Alert,
  Spinner,
} from 'react-bootstrap';

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVariant, setAlertVariant] = useState('success');
  const [loading, setLoading] = useState(false);
  const [updatingId, setUpdatingId] = useState(null);

  // Fetch all appointments
  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:8084/api/appointments');
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to fetch appointments');
      }
      const data = await res.json();
      setAppointments(data);
    } catch (error) {
      console.error('Failed to fetch appointments:', error);
      showAlertMessage(error.message || 'Failed to load appointments', 'danger');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const map = {
      Scheduled: 'primary',
      Completed: 'success',
      Cancelled: 'danger',
      'In Progress': 'warning',
    };
    return map[status] || 'secondary';
  };

  const handleStatusUpdate = async (id, newStatus) => {
    setUpdatingId(id);
    try {
      const response = await fetch(`http://localhost:8084/api/appointment/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          appointment_status: newStatus,
          appointment_doctor: selectedAppointment?.appointment_doctor,
          appointment_patient: selectedAppointment?.appointment_patient,
          appointment_date: selectedAppointment?.appointment_date,
          appointment_time: selectedAppointment?.appointment_time,
          appointment_reason: selectedAppointment?.appointment_reason
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Status update failed');
      }

      setAppointments(prev => prev.map(apt => 
        apt.appointment_id === id ? { ...apt, appointment_status: newStatus } : apt
      ));
      
      showAlertMessage(`Status updated to ${newStatus}`, 'success');
      setShowModal(false);
    } catch (error) {
      showAlertMessage(error.message || 'Failed to update status', 'danger');
    } finally {
      setUpdatingId(null);
    }
  };

  const showAlertMessage = (message, variant) => {
    setAlertMessage(message);
    setAlertVariant(variant);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  // Filter appointments by search term only
  const filteredAppointments = appointments.filter(apt => {
    const searchLower = searchTerm.toLowerCase();
    return (
      apt.appointment_patient?.toLowerCase().includes(searchLower) ||
      apt.appointment_date?.toLowerCase().includes(searchLower) ||
      apt.appointment_reason?.toLowerCase().includes(searchLower) ||
      apt.appointment_status?.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="p-3">
      <h3 className="mb-4">All Appointments</h3>

      <div className="d-flex justify-content-between mb-3">
        <Form.Control
          type="search"
          placeholder="Search appointments..."
          style={{ width: '300px' }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button 
          variant="primary" 
          onClick={fetchAppointments}
          disabled={loading}
        >
          {loading ? (
            <>
              <Spinner as="span" size="sm" animation="border" role="status" />
              <span className="ms-2">Refreshing...</span>
            </>
          ) : 'Refresh Appointments'}
        </Button>
      </div>

      {showAlert && (
        <Alert variant={alertVariant} onClose={() => setShowAlert(false)} dismissible>
          {alertMessage}
        </Alert>
      )}

      {loading && !appointments.length && (
        <div className="text-center my-5">
          <Spinner animation="border" />
          <p className="mt-2">Loading appointments...</p>
        </div>
      )}

      <Row>
        {filteredAppointments.map((apt) => (
          <Col md={6} lg={4} className="mb-4" key={apt.appointment_id}>
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <h5 className="mb-1">{apt.appointment_patient}</h5>
                    <small className="text-muted">{apt.appointment_reason}</small>
                  </div>
                  <Badge bg={getStatusColor(apt.appointment_status || 'Scheduled')}>
                    {apt.appointment_status || 'Scheduled'}
                  </Badge>
                </div>
                <hr />
                <p className="mb-1">
                  <strong>Doctor ID:</strong> {apt.appointment_doctor}
                </p>
                <p className="mb-1">
                  <strong>Date:</strong> {apt.appointment_date}
                </p>
                <p className="mb-1">
                  <strong>Time:</strong> {apt.appointment_time}
                </p>
                <div className="d-flex gap-2 mt-3">
                  <Button
                    size="sm"
                    variant="outline-primary"
                    onClick={() => {
                      setSelectedAppointment(apt);
                      setShowModal(true);
                    }}
                  >
                    View Details
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {!loading && filteredAppointments.length === 0 && (
        <div className="text-center text-muted mt-5">
          <i className="bi bi-calendar-x" style={{ fontSize: '3rem' }}></i>
          <p className="mt-3">No appointments found</p>
        </div>
      )}

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Appointment Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedAppointment && (
            <>
              <p><strong>Patient:</strong> {selectedAppointment.appointment_patient}</p>
              <p><strong>Doctor ID:</strong> {selectedAppointment.appointment_doctor}</p>
              <p><strong>Reason:</strong> {selectedAppointment.appointment_reason}</p>
              <p><strong>Date:</strong> {selectedAppointment.appointment_date}</p>
              <p><strong>Time:</strong> {selectedAppointment.appointment_time}</p>
              <p><strong>Status:</strong> 
                <Badge bg={getStatusColor(selectedAppointment.appointment_status)} className="ms-2">
                  {selectedAppointment.appointment_status || 'Scheduled'}
                </Badge>
              </p>
              
              <hr />
              
              <div className="d-flex flex-wrap gap-2 mt-3">
                <Button
                  variant="warning"
                  onClick={() => handleStatusUpdate(selectedAppointment.appointment_id, 'In Progress')}
                  disabled={updatingId === selectedAppointment.appointment_id}
                >
                  {updatingId === selectedAppointment.appointment_id ? (
                    <Spinner as="span" size="sm" animation="border" role="status" />
                  ) : 'Mark In Progress'}
                </Button>
                <Button
                  variant="success"
                  onClick={() => handleStatusUpdate(selectedAppointment.appointment_id, 'Completed')}
                  disabled={updatingId === selectedAppointment.appointment_id}
                >
                  {updatingId === selectedAppointment.appointment_id ? (
                    <Spinner as="span" size="sm" animation="border" role="status" />
                  ) : 'Mark Completed'}
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleStatusUpdate(selectedAppointment.appointment_id, 'Cancelled')}
                  disabled={updatingId === selectedAppointment.appointment_id}
                >
                  {updatingId === selectedAppointment.appointment_id ? (
                    <Spinner as="span" size="sm" animation="border" role="status" />
                  ) : 'Cancel Appointment'}
                </Button>
              </div>
            </>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default DoctorAppointments;