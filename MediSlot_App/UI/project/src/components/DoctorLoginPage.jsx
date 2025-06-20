import { useState, useEffect } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const DoctorLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [doctorData, setDoctorData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if already authenticated (you might want to use localStorage/sessionStorage)
    if (isAuthenticated) {
      navigate('/doctor-dashboard');
    }
  }, [isAuthenticated, navigate]);

  if (isAuthenticated) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // First, fetch all doctors
      const res = await fetch('http://localhost:8083/api/doctors');
      
      if (res.ok) {
        const doctors = await res.json();
        
        // Find the doctor with matching email and password
        const foundDoctor = doctors.find(
          doctor => doctor.doctor_mail === email && doctor.doctor_password === password
        );
        
        if (foundDoctor) {
          // Login successful
          setIsAuthenticated(true);
          setDoctorData(foundDoctor);
          // You might want to store this in localStorage/sessionStorage
          localStorage.setItem('doctorAuth', 'true');
          localStorage.setItem('doctorData', JSON.stringify(foundDoctor));
          navigate('/doctor-dashboard');
        } else {
          setError('Invalid email or password');
        }
      } else {
        setError('Failed to fetch doctors data');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <Container fluid className="vh-100 d-flex align-items-center justify-content-center bg-light">
        <Row className="w-100">
          <Col md={6} lg={4} className="mx-auto">
            <Card className="shadow-lg border-0">
              <Card.Body className="p-5">
                <div className="text-center mb-4">
                  <i className="bi bi-person-badge text-success" style={{ fontSize: '3rem' }}></i>
                  <h2 className="mt-3 mb-1 text-dark">Doctor Portal</h2>
                  <p className="text-muted">Sign in to your account</p>
                </div>

                {error && <Alert variant="danger">{error}</Alert>}

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      size="lg"
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      size="lg"
                    />
                  </Form.Group>

                  <Button
                    variant="success"
                    type="submit"
                    size="lg"
                    className="w-100"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Signing in...
                      </>
                    ) : (
                      'Sign In'
                    )}
                  </Button>
                </Form>

                <div className="mt-4 text-center">
                  <small className="text-muted">
                    Use your real credentials created in Manage Doctors
                  </small>
                </div>

                <div className="text-center mt-3">
                  <Button
                    variant="link"
                    onClick={() => navigate('/')}
                    className="text-decoration-none"
                  >
                    <i className="bi bi-arrow-left me-1"></i>
                    Back to Home
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default DoctorLoginPage;