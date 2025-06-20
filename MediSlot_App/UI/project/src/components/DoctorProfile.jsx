import { useState } from 'react';
import { Row, Col, Card, Button, Alert, Carousel, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const DoctorProfile = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();
  
  // Get doctor data from localStorage
  const doctor = JSON.parse(localStorage.getItem('doctorData')) || {};
  
  const catchphrases = [
    {
      text: "Your Health, Just One Click Away.",
      subtext: "Providing compassionate care at your convenience",
      image: "https://images.unsplash.com/photo-1674702703321-b44990d8b6ba?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZG9jdG9yJTIwaW1hZ2UlMjBzeW1ib2xpY3xlbnwwfHwwfHx8MA%3D%3D"
    },
    {
      text: "Your kindness and care gave us strength when we had none.",
      subtext: "Thank you for being more than just a doctor",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZG9jdG9yJTIwa2luZG5lc3N8ZW58MHx8MHx8fDA%3D"
    },
    {
      text: "Healing with Heart, Caring with Compassion.",
      subtext: "Dedicated to your wellbeing every step of the way",
      image: "https://images.unsplash.com/photo-1581595219315-a187dd40c322?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGRvY3RvciUyMGNhcmV8ZW58MHx8MHx8fDA%3D"
    }
  ];

  const handleSelect = (selectedIndex) => {
    setActiveIndex(selectedIndex);
  };

  const handleViewAppointments = () => {
    navigate('/doctor-dashboard/appointments');
  };

  const handleWritePrescription = () => {
    navigate('/doctor-dashboard/prescriptions');
  };

  return (
    <div className="doctor-profile-page">
      {showAlert && (
        <Alert variant="success" dismissible onClose={() => setShowAlert(false)} className="mb-4">
          Action completed successfully!
        </Alert>
      )}

      {/* Hero Section with Carousel */}
      <Carousel activeIndex={activeIndex} onSelect={handleSelect} fade className="mb-5 rounded-3 overflow-hidden shadow">
        {catchphrases.map((item, index) => (
          <Carousel.Item key={index} style={{ height: '400px' }}>
            <div className="position-relative h-100">
              <Image 
                src={item.image} 
                alt="Doctor care" 
                className="w-100 h-100 object-fit-cover"
              />
              <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex align-items-center">
                <div className="container text-white text-center">
                  <h1 className="display-4 fw-bold mb-3">{item.text}</h1>
                  <p className="lead">{item.subtext}</p>
                </div>
              </div>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>

      {/* Quick Actions Section */}
      <Row className="g-4 mb-5">
        <Col md={4}>
          <Card className="h-100 border-0 shadow-sm hover-scale" onClick={handleViewAppointments}>
            <Card.Body className="text-center p-4">
              <div className="bg-primary bg-opacity-10 rounded-circle p-3 mb-3 mx-auto" style={{ width: '80px', height: '80px' }}>
                <i className="bi bi-calendar-check text-primary" style={{ fontSize: '2rem' }}></i>
              </div>
              <h4>View Appointments</h4>
              <p className="text-muted">Check your upcoming patient visits</p>
              <Button variant="outline-primary" className="mt-2">
                View Schedule <i className="bi bi-arrow-right ms-2"></i>
              </Button>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4}>
          <Card className="h-100 border-0 shadow-sm hover-scale" onClick={handleWritePrescription}>
            <Card.Body className="text-center p-4">
              <div className="bg-success bg-opacity-10 rounded-circle p-3 mb-3 mx-auto" style={{ width: '80px', height: '80px' }}>
                <i className="bi bi-prescription2 text-success" style={{ fontSize: '2rem' }}></i>
              </div>
              <h4>Write Prescription</h4>
              <p className="text-muted">Create new prescriptions for patients</p>
              <Button variant="outline-success" className="mt-2">
                Create New <i className="bi bi-plus-circle ms-2"></i>
              </Button>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4}>
          <Card className="h-100 border-0 shadow-sm hover-scale">
            <Card.Body className="text-center p-4">
              <div className="bg-info bg-opacity-10 rounded-circle p-3 mb-3 mx-auto" style={{ width: '80px', height: '80px' }}>
                <i className="bi bi-file-earmark-text text-info" style={{ fontSize: '2rem' }}></i>
              </div>
              <h4>Patient Reports</h4>
              <p className="text-muted">Review patient medical history</p>
              <Button 
                variant="outline-info" 
                className="mt-2"
                onClick={() => navigate('/doctor-dashboard/reports')}
              >
                View Reports <i className="bi bi-folder2-open ms-2"></i>
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Welcome Section */}
      <Card className="border-0 shadow-sm mb-5">
        <Card.Body className="p-4 p-md-5">
          <Row className="align-items-center">
            <Col md={6} className="mb-4 mb-md-0">
              <h2 className="fw-bold mb-3">Welcome, Dr. {doctor.doctor_name}</h2>
              <p className="lead text-muted mb-4">
                "The good physician treats the disease; the great physician treats the patient who has the disease."
              </p>
              <Button variant="success" size="lg">
                <i className="bi bi-bell-fill me-2"></i>
                View Today's Schedule
              </Button>
            </Col>
            <Col md={6}>
              <div className="ratio ratio-16x9 rounded overflow-hidden">
                <iframe 
                  
                  title="Doctor at work"
                  allowFullScreen
                  className="rounded"
                ></iframe>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
};

export default DoctorProfile;