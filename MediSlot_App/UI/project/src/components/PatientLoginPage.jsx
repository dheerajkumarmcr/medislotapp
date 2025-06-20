import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Card, Alert } from 'react-bootstrap';

const PatientLoginPage = () => {
  const [formData, setFormData] = useState({
    patient_mail: '',
    patient_password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      console.log('Attempting login...'); // Debug log 1
      
      const allPatientsResponse = await fetch('http://localhost:8087/api/patients');
      
      console.log('Response status:', allPatientsResponse.status); // Debug log 2
      
      if (!allPatientsResponse.ok) {
        throw new Error('Failed to fetch patients');
      }

      const allPatients = await allPatientsResponse.json();
      console.log('Patients fetched:', allPatients.length); // Debug log 3
      
      const matchedPatient = allPatients.find(patient => 
        patient.patient_mail === formData.patient_mail && 
        patient.patient_password === formData.patient_password
      );

      console.log('Matched patient:', matchedPatient); // Debug log 4

      if (!matchedPatient) {
        throw new Error('Invalid email or password');
      }

      localStorage.setItem('patientData', JSON.stringify({
        patient_id: matchedPatient.patient_id,
        patient_name: matchedPatient.patient_name,
        patient_mail: matchedPatient.patient_mail
      }));
      
      console.log('Login successful, attempting navigation...'); // Debug log 5
      alert('Login successful!');
      
      // Force a hard redirect as fallback
      window.location.href = '/patient-dashboard';
      
      // Also try the SPA navigation
      navigate('/patient-dashboard', { replace: true });
      
    } catch (err) {
      console.error('Login error:', err); // Debug log 6
      setError(err.message || 'An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
      <Card style={{ width: '100%', maxWidth: '400px' }} className="p-4">
        <Card.Body>
          <h2 className="text-center mb-4">Patient Login</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                name="patient_mail"
                placeholder="Enter your email"
                value={formData.patient_mail}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="patient_password"
                placeholder="Enter password"
                value={formData.patient_password}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Button 
              variant="primary" 
              type="submit" 
              className="w-100 mb-3"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>

            <div className="text-center">
              <Button 
                variant="link" 
                onClick={() => navigate('/')}
              >
                Back to Home
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default PatientLoginPage;