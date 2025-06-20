import React, { useState, useEffect } from 'react';
import { Form, Button, Card, Container, Alert } from 'react-bootstrap';
import { API_ENDPOINTS } from '../config/api';

const BookAppointment = () => {
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [formData, setFormData] = useState({
    doctorId: '',
    patientId: '',
    appointmentDate: '',
    appointmentTime: '',
    reason: ''
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [doctorsRes, patientsRes] = await Promise.all([
          fetch(API_ENDPOINTS.DOCTORS),
          fetch(API_ENDPOINTS.PATIENTS)
        ]);
        
        const doctorsData = await doctorsRes.json();
        const patientsData = await patientsRes.json();
        
        setDoctors(doctorsData);
        setPatients(patientsData);
      } catch (error) {
        console.error('Error fetching data:', error);
        setMessage('Error loading doctors and patients');
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch(API_ENDPOINTS.APPOINTMENTS, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        setMessage('Appointment booked successfully!');
        setFormData({
          doctorId: '',
          patientId: '',
          appointmentDate: '',
          appointmentTime: '',
          reason: ''
        });
      } else {
        setMessage('Failed to book appointment');
      }
    } catch (error) {
      console.error('Error booking appointment:', error);
      setMessage('Error booking appointment');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Container className="mt-4">
      <Card>
        <Card.Header>
          <h3>Book Appointment</h3>
        </Card.Header>
        <Card.Body>
          {message && (
            <Alert variant={message.includes('successfully') ? 'success' : 'danger'}>
              {message}
            </Alert>
          )}
          
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Select Doctor</Form.Label>
              <Form.Select
                name="doctorId"
                value={formData.doctorId}
                onChange={handleInputChange}
                required
              >
                <option value="">Choose a doctor...</option>
                {doctors.map(doctor => (
                  <option key={doctor.id} value={doctor.id}>
                    {doctor.name} - {doctor.specialization}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Select Patient</Form.Label>
              <Form.Select
                name="patientId"
                value={formData.patientId}
                onChange={handleInputChange}
                required
              >
                <option value="">Choose a patient...</option>
                {patients.map(patient => (
                  <option key={patient.id} value={patient.id}>
                    {patient.name} - {patient.email}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Appointment Date</Form.Label>
              <Form.Control
                type="date"
                name="appointmentDate"
                value={formData.appointmentDate}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Appointment Time</Form.Label>
              <Form.Control
                type="time"
                name="appointmentTime"
                value={formData.appointmentTime}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Reason for Visit</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="reason"
                value={formData.reason}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Button 
              type="submit" 
              variant="primary" 
              disabled={loading}
            >
              {loading ? 'Booking...' : 'Book Appointment'}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default BookAppointment;