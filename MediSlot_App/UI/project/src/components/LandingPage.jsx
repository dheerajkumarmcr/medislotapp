import React, { useRef, useState } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Navbar,
  Nav,
  Alert,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const [registerData, setRegisterData] = useState({
    patient_name: '',
    patient_mail: '',
    patient_password: '',
    confirmPassword: ''
  });
  const [validationErrors, setValidationErrors] = useState({});
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const homeRef = useRef(null);
  const servicesRef = useRef(null);
  const departmentsRef = useRef(null);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);
  const authRef = useRef(null);

  // Scroll handler
  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const validateForm = () => {
    const errors = {};
    
    if (!registerData.patient_name.trim()) {
      errors.patient_name = 'Full name is required';
    }
    
    if (!registerData.patient_mail.trim()) {
      errors.patient_mail = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(registerData.patient_mail)) {
      errors.patient_mail = 'Email is invalid';
    }
    
    if (!registerData.patient_password) {
      errors.patient_password = 'Password is required';
    } else if (registerData.patient_password.length < 6) {
      errors.patient_password = 'Password must be at least 6 characters';
    }
    
    if (registerData.patient_password !== registerData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const { confirmPassword, ...dataToSend } = registerData;
      
      const response = await fetch('http://localhost:8087/api/patient', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      setRegistrationSuccess(true);
      // Clear form on success
      setRegisterData({
        patient_name: '',
        patient_mail: '',
        patient_password: '',
        confirmPassword: ''
      });
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRegisterData({
      ...registerData,
      [name]: value,
    });
    
    // Clear validation error when user types
    if (validationErrors[name]) {
      setValidationErrors({
        ...validationErrors,
        [name]: null
      });
    }
  };

  const services = [
    {
      icon: 'bi-calendar-check',
      title: 'Easy Appointment Booking',
      description: 'Book appointments with your preferred doctors in just a few clicks',
    },
    {
      icon: 'bi-person-badge',
      title: 'Expert Doctors',
      description: 'Access to qualified and experienced medical professionals',
    },
    {
      icon: 'bi-clock-history',
      title: '24/7 Support',
      description: 'Round-the-clock medical assistance and emergency services',
    },
    {
      icon: 'bi-shield-check',
      title: 'Secure & Private',
      description: 'Your medical data is protected with advanced security measures',
    },
    {
      icon: 'bi-heart-pulse',
      title: 'Health Monitoring',
      description: 'Track your health records and get personalized care recommendations',
    },
    {
      icon: 'bi-telephone',
      title: 'Telemedicine',
      description: 'Consult with doctors remotely through video calls and chat',
    },
  ];

  const departments = [
    { name: 'Cardiology', icon: 'bi-heart', color: 'danger' },
    { name: 'Neurology', icon: 'bi-capsule', color: 'primary' },
    { name: 'Pediatrics', icon: 'bi-person-hearts', color: 'success' },
    { name: 'Orthopedics', icon: 'bi-bandaid', color: 'warning' },
    { name: 'Dermatology', icon: 'bi-person-check', color: 'info' },
    { name: 'General Medicine', icon: 'bi-hospital', color: 'secondary' },
  ];

  return (
    <div className="landing-page">
      {/* Navigation */}
      <Navbar bg="white" expand="lg" className="shadow-sm fixed-top">
        <Container>
          <Navbar.Brand className="fw-bold text-primary fs-3">
            <i className="bi bi-hospital me-2"></i>
            MediSlot
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link onClick={() => scrollToSection(homeRef)}>Home</Nav.Link>
              <Nav.Link onClick={() => scrollToSection(servicesRef)}>
                Services
              </Nav.Link>
              <Nav.Link onClick={() => scrollToSection(departmentsRef)}>
                Departments
              </Nav.Link>
              <Nav.Link onClick={() => scrollToSection(aboutRef)}>
                About
              </Nav.Link>
              <Nav.Link onClick={() => scrollToSection(contactRef)}>
                Contact
              </Nav.Link>
              <Nav.Link onClick={() => scrollToSection(authRef)}>
                Register
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Hero Section */}
      <section ref={homeRef} id="home" className="hero-section">
        <Container>
          <Row className="align-items-center min-vh-100">
            <Col lg={6}>
              <div className="hero-content">
                <h1 className="display-4 fw-bold text-primary mb-4">
                  MediSlot
                  <span className="text-secondary d-block fs-3">
                    Prescribe Time ! Not just Treatment !!
                  </span>
                </h1>
                <p className="lead text-muted mb-4">
                  Experience seamless healthcare with our advanced booking
                  system. Connect with top medical professionals and manage your
                  health journey effortlessly.
                </p>
                <div className="hero-stats d-flex gap-4 mb-4">
                  <div className="text-center">
                    <h3 className="text-primary mb-0">500+</h3>
                    <small className="text-muted">Doctors</small>
                  </div>
                  <div className="text-center">
                    <h3 className="text-primary mb-0">10K+</h3>
                    <small className="text-muted">Patients</small>
                  </div>
                  <div className="text-center">
                    <h3 className="text-primary mb-0">24/7</h3>
                    <small className="text-muted">Support</small>
                  </div>
                </div>
                <Button
                  size="lg"
                  className="me-3"
                  onClick={() => scrollToSection(authRef)}
                >
                  <i className="bi bi-person-plus me-2"></i>
                  Register Now
                </Button>
                <Button
                  variant="outline-primary"
                  size="lg"
                  onClick={() => scrollToSection(aboutRef)}
                >
                  Learn More
                </Button>
              </div>
            </Col>
            <Col lg={6}>
              <div className="hero-image text-center">
                <div className="hero-card bg-white rounded-4 shadow-lg p-4">
                  <img
                    src="https://images.pexels.com/photos/4021775/pexels-photo-4021775.jpeg?auto=compress&cs=tinysrgb&w=600"
                    alt="Medical Team"
                    className="img-fluid rounded-3 mb-3"
                  />
                  <div className="d-flex justify-content-around text-center">
                    <div>
                      <i className="bi bi-award text-primary fs-2"></i>
                      <p className="small mb-0 mt-1">Certified</p>
                    </div>
                    <div>
                      <i className="bi bi-shield-check text-success fs-2"></i>
                      <p className="small mb-0 mt-1">Secure</p>
                    </div>
                    <div>
                      <i className="bi bi-clock text-info fs-2"></i>
                      <p className="small mb-0 mt-1">Fast</p>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Registration Section */}
      <section ref={authRef} id="auth" className="auth-section bg-light py-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6}>
              <Card className="shadow-lg border-0 rounded-4">
                <Card.Body className="p-5">
                  <div className="text-center mb-4">
                    <h3 className="text-primary mb-2">Create Your Account</h3>
                    <p className="text-muted">
                      Join MediSlot for better healthcare experience
                    </p>
                  </div>

                  {registrationSuccess ? (
                    <div className="text-center">
                      <div className="mb-4">
                        <i className="bi bi-check-circle text-success fs-1"></i>
                        <h4 className="mt-3">Registration Successful!</h4>
                        <p className="text-muted">
                          Thank you for registering, {registerData.patient_name}. 
                          Your account has been created successfully. You can now login with your credentials.
                        </p>
                      </div>
                      <Button
                        variant="primary"
                        size="lg"
                        onClick={() => navigate('/patient-login')}
                      >
                        <i className="bi bi-box-arrow-in-right me-2"></i>
                        Go to Login Page
                      </Button>
                    </div>
                  ) : (
                    <>
                      {error && <Alert variant="danger">{error}</Alert>}
                      <Form onSubmit={handleRegister} noValidate>
                        <Form.Group className="mb-3">
                          <Form.Label>Full Name</Form.Label>
                          <Form.Control
                            type="text"
                            name="patient_name"
                            placeholder="Enter your full name"
                            value={registerData.patient_name}
                            onChange={handleInputChange}
                            isInvalid={!!validationErrors.patient_name}
                            required
                          />
                          <Form.Control.Feedback type="invalid">
                            {validationErrors.patient_name}
                          </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3">
                          <Form.Label>Email Address</Form.Label>
                          <Form.Control
                            type="email"
                            name="patient_mail"
                            placeholder="Enter your email"
                            value={registerData.patient_mail}
                            onChange={handleInputChange}
                            isInvalid={!!validationErrors.patient_mail}
                            required
                          />
                          <Form.Control.Feedback type="invalid">
                            {validationErrors.patient_mail}
                          </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3">
                          <Form.Label>Password</Form.Label>
                          <Form.Control
                            type="password"
                            name="patient_password"
                            placeholder="Create a password (min 6 characters)"
                            value={registerData.patient_password}
                            onChange={handleInputChange}
                            isInvalid={!!validationErrors.patient_password}
                            required
                          />
                          <Form.Control.Feedback type="invalid">
                            {validationErrors.patient_password}
                          </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-4">
                          <Form.Label>Confirm Password</Form.Label>
                          <Form.Control
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm your password"
                            value={registerData.confirmPassword}
                            onChange={handleInputChange}
                            isInvalid={!!validationErrors.confirmPassword}
                            required
                          />
                          <Form.Control.Feedback type="invalid">
                            {validationErrors.confirmPassword}
                          </Form.Control.Feedback>
                        </Form.Group>

                        <Button
                          variant="primary"
                          type="submit"
                          size="lg"
                          className="w-100 mb-3"
                          disabled={loading}
                        >
                          {loading ? (
                            <>
                              <span
                                className="spinner-border spinner-border-sm me-2"
                                role="status"
                                aria-hidden="true"
                              ></span>
                              Registering...
                            </>
                          ) : (
                            <>
                              <i className="bi bi-person-plus me-2"></i>
                              Register
                            </>
                          )}
                        </Button>
                      </Form>

                      <div className="text-center mt-3">
                        <p className="text-muted">
                          Already have an account?{' '}
                          <Button
                            variant="link"
                            onClick={() => navigate('/patient-login')}
                            className="text-decoration-none p-0"
                          >
                            Login here
                          </Button>
                        </p>
                      </div>

                      <hr className="my-4" />

                      <div className="text-center">
                        <Row>
                          <Col md={6} className="mb-2">
                            <Button
                              variant="outline-success"
                              onClick={() => navigate('/doctor-login')}
                              className="w-100"
                            >
                              <i className="bi bi-person-badge me-2"></i>
                              Doctor Login
                            </Button>
                          </Col>
                          <Col md={6}>
                            <Button
                              variant="outline-secondary"
                              onClick={() => navigate('/admin-login')}
                              className="w-100"
                            >
                              <i className="bi bi-shield-lock me-2"></i>
                              Admin Login
                            </Button>
                          </Col>
                        </Row>
                      </div>
                    </>
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Services Section */}
      <section ref={servicesRef} id="services" className="py-5">
        <Container>
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold text-primary mb-3">
              Our Services
            </h2>
            <p className="lead text-muted">
              Comprehensive healthcare solutions at your fingertips
            </p>
          </div>
          <Row>
            {services.map((service, index) => (
              <Col md={6} lg={4} key={index} className="mb-4">
                <Card className="h-100 border-0 shadow-sm service-card">
                  <Card.Body className="text-center p-4">
                    <div
                      className="service-icon bg-primary bg-opacity-10 rounded-circle p-3 mb-3 mx-auto"
                      style={{ width: '80px', height: '80px' }}
                    >
                      <i
                        className={`${service.icon} text-primary`}
                        style={{ fontSize: '2rem' }}
                      ></i>
                    </div>
                    <h5 className="fw-bold mb-3">{service.title}</h5>
                    <p className="text-muted">{service.description}</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Departments Section */}
      <section ref={departmentsRef} id="departments" className="py-5 bg-light">
        <Container>
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold text-primary mb-3">
              Medical Departments
            </h2>
            <p className="lead text-muted">
              Specialized care across multiple medical fields
            </p>
          </div>
          <Row>
            {departments.map((dept, index) => (
              <Col md={6} lg={4} key={index} className="mb-4">
                <Card className="h-100 border-0 shadow-sm department-card">
                  <Card.Body className="text-center p-4">
                    <div
                      className={`department-icon bg-${dept.color} bg-opacity-10 rounded-circle p-3 mb-3 mx-auto`}
                      style={{ width: '70px', height: '70px' }}
                    >
                      <i
                        className={`${dept.icon} text-${dept.color}`}
                        style={{ fontSize: '1.8rem' }}
                      ></i>
                    </div>
                    <h5 className="fw-bold">{dept.name}</h5>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* About Section */}
      <section ref={aboutRef} id="about" className="py-5">
        <Container>
          <Row className="align-items-center">
            <Col lg={6}>
              <img
                src="https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Hospital Interior"
                className="img-fluid rounded-4 shadow"
              />
            </Col>
            <Col lg={6}>
              <div className="ps-lg-5 mt-4 mt-lg-0">
                <h2 className="display-5 fw-bold text-primary mb-4">
                  About MediSlot
                </h2>
                <p className="lead text-muted mb-4">
                  MediSlot is revolutionizing healthcare accessibility with our
                  smart booking system. We connect patients with qualified
                  medical professionals seamlessly.
                </p>
                <div className="mb-4">
                  <div className="d-flex align-items-center mb-3">
                    <div className="bg-success bg-opacity-10 rounded-circle p-2 me-3">
                      <i className="bi bi-check-circle text-success"></i>
                    </div>
                    <span>Advanced appointment scheduling system</span>
                  </div>
                  <div className="d-flex align-items-center mb-3">
                    <div className="bg-success bg-opacity-10 rounded-circle p-2 me-3">
                      <i className="bi bi-check-circle text-success"></i>
                    </div>
                    <span>Qualified and experienced medical staff</span>
                  </div>
                  <div className="d-flex align-items-center mb-3">
                    <div className="bg-success bg-opacity-10 rounded-circle p-2 me-3">
                      <i className="bi bi-check-circle text-success"></i>
                    </div>
                    <span>24/7 emergency medical support</span>
                  </div>
                </div>
                <Button variant="primary" size="lg">
                  Learn More About Us
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Contact Section */}
      <section
        ref={contactRef}
        id="contact"
        className="py-5 bg-primary text-white"
      >
        <Container>
          <Row>
            <Col lg={8} className="mx-auto text-center">
              <h2 className="display-5 fw-bold mb-4">Get In Touch</h2>
              <p className="lead mb-4">
                Have questions? Need assistance? Our team is here to help you
                24/7.
              </p>
              <Row className="justify-content-center">
                <Col md={4} className="mb-3">
                  <div className="contact-item">
                    <i className="bi bi-telephone fs-2 mb-2"></i>
                    <h5>Call Us</h5>
                    <p>+1 (555) 123-4567</p>
                  </div>
                </Col>
                <Col md={4} className="mb-3">
                  <div className="contact-item">
                    <i className="bi bi-envelope fs-2 mb-2"></i>
                    <h5>Email Us</h5>
                    <p>info@medislot.com</p>
                  </div>
                </Col>
                <Col md={4} className="mb-3">
                  <div className="contact-item">
                    <i className="bi bi-geo-alt fs-2 mb-2"></i>
                    <h5>Visit Us</h5>
                    <p>123 Medical Center Dr.</p>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white py-4">
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <div className="d-flex align-items-center">
                <i className="bi bi-hospital me-2 fs-4"></i>
                <span className="fw-bold fs-5">MediSlot</span>
              </div>
            </Col>
            <Col md={6} className="text-md-end mt-2 mt-md-0">
              <p className="mb-0">
                © 2025 MediSlot Hospital System. All rights reserved.
              </p>
            </Col>
          </Row>
        </Container>
      </footer>
    </div>
  );
};

export default LandingPage;