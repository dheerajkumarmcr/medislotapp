import { Row, Col, Card, ListGroup, Modal, Button } from 'react-bootstrap';
import { useState } from 'react';
import { Carousel, Image } from 'react-bootstrap';

const PatientProfile = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [selectedPolicy, setSelectedPolicy] = useState(null);

  const handleSelect = (selectedIndex) => {
    setActiveIndex(selectedIndex);
  };

  const handlePolicyClick = (policy) => {
    setSelectedPolicy(policy);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPolicy(null);
  };

  const policies = [
    {
      title: 'Booking Guidelines',
      icon: 'bi-book',
      color: '#17a2b8',
      hoverColor: '#1fc8e3',
      items: [
        'Arrive 15 minutes prior to your appointment time',
        'Bring valid government-issued ID and relevant medical records',
        'Complete pre-visit forms online if available',
        'Carry your insurance information if applicable'
      ],
      phone: '081700 12345',
      description: 'For booking assistance or questions, please contact our reception desk during business hours.'
    },
    {
      title: 'Cancellation Policy',
      icon: 'bi-calendar-x',
      color: '#dc3545',
      hoverColor: '#ff4d6d',
      items: [
        'Cancel at least 24 hours before your appointment',
        'Late cancellations may incur a fee',
        'No-shows will be charged 50% of service fee',
        'Emergency cancellations accepted with documentation'
      ],
      phone: '081700 55555',
      description: 'We understand emergencies happen. For urgent cancellations after hours, please leave a voicemail.'
    },
    {
      title: 'Payment Policy',
      icon: 'bi-cash-coin',
      color: '#28a745',
      hoverColor: '#52b788',
      items: [
        'Cash payments accepted at all facilities',
        'Credit/debit cards coming soon',
        'Insurance co-pays due at time of service',
        'Payment plans available for major procedures'
      ],
      phone: '081700 67890',
      description: 'Financial assistance programs available for qualifying patients. Ask our billing department for details.'
    }
  ];

  const catchphrases = [
    {
      text: "Your Health, Just One Click Away.",
      subtext: "Providing compassionate care at your convenience",
      image: "https://thumbs.dreamstime.com/b/smiling-friendly-female-doctor-touches-patient-s-shoulder-assuring-everything-will-be-fine-sets-young-women-positive-237435734.jpg"
    },
    {
      text: "Every small progress is still a progress. Trust the process, and trust yourself",
      subtext: "Thank you for being more than just a doctor",
      image: "https://safehandshealthcare.com/wp-content/uploads/2024/04/blog2.jpg"
    },
    {
      text: "What lies behind us and what lies before us are tiny matters compared to what lies within us",
      subtext: "Dedicated to your wellbeing every step of the way",
      image: "https://s3.envato.com/files/3142c4e8-d04d-415e-aa24-910716c6a9d9/inline_image_preview.jpg"
    }
  ];

  return (
    <div className="p-3">
      <div className="text-center mb-5">
        <h2 className="text-primary">
          <i className="bi bi-hospital me-2"></i>
          Welcome
        </h2>
        <p className="lead text-muted">Your health journey starts here</p>
      </div>

      <Row className="justify-content-center mb-5">
        <Col lg={8}>
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
        </Col>
      </Row>

      {/* Policy Navigation Icons */}
      <Row className="justify-content-center mb-4">
        {policies.map((policy, index) => (
          <Col xs={4} md={4} lg={4} key={index} className="text-center">
            <div 
              className="d-flex flex-column align-items-center p-3 rounded-3 cursor-pointer transition-all hover-shadow"
              onClick={() => handlePolicyClick(policy)}
              style={{
                cursor: 'pointer',
                backgroundColor: 'transparent',
                border: '2px solid transparent',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = `${policy.hoverColor}20`;
                e.currentTarget.style.border = `2px solid ${policy.hoverColor}`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.border = '2px solid transparent';
              }}
            >
              <div
                className="p-3 rounded-circle mb-2 transition-all"
                style={{
                  backgroundColor: `${policy.color}20`,
                }}
              >
                <i
                  className={`bi ${policy.icon} fs-2`}
                  style={{
                    color: policy.color
                  }}
                ></i>
              </div>
              <h5
                className="mb-0"
                style={{
                  color: policy.color
                }}
              >
                {policy.title}
              </h5>
            </div>
          </Col>
        ))}
      </Row>

      {/* Policy Details Modal */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        {selectedPolicy && (
          <>
            <Modal.Header 
              closeButton 
              style={{
                borderBottom: `3px solid ${selectedPolicy.hoverColor}`,
                backgroundColor: `${selectedPolicy.hoverColor}10`
              }}
            >
              <Modal.Title className="d-flex align-items-center">
                <div
                  className="p-2 rounded-circle me-3"
                  style={{
                    backgroundColor: `${selectedPolicy.hoverColor}20`
                  }}
                >
                  <i
                    className={`bi ${selectedPolicy.icon} fs-4`}
                    style={{
                      color: selectedPolicy.hoverColor
                    }}
                  ></i>
                </div>
                <span style={{ color: selectedPolicy.hoverColor }}>
                  {selectedPolicy.title}
                </span>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <ListGroup variant="flush">
                {selectedPolicy.items.map((item, i) => (
                  <ListGroup.Item
                    key={i}
                    className="d-flex align-items-center py-2 border-0"
                  >
                    <i
                      className={`bi bi-check-circle-fill me-2`}
                      style={{ color: selectedPolicy.hoverColor }}
                    ></i>
                    {item}
                  </ListGroup.Item>
                ))}
              </ListGroup>

              {selectedPolicy.phone && (
                <div
                  className="mt-3 p-3 rounded text-center"
                  style={{
                    backgroundColor: `${selectedPolicy.hoverColor}10`,
                    borderLeft: `3px solid ${selectedPolicy.hoverColor}`
                  }}
                >
                  <h6 className="mb-2" style={{ color: selectedPolicy.hoverColor }}>
                    <i className="bi bi-telephone-outbound-fill me-2"></i>
                    Contact Information
                  </h6>
                  <h4 className="text-dark">{selectedPolicy.phone}</h4>
                </div>
              )}

              <div className="mt-4 p-3 bg-light rounded">
                <p className="mb-0 text-muted">
                  <i className="bi bi-info-circle me-2"></i>
                  {selectedPolicy.description}
                </p>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button 
                variant="outline-secondary" 
                onClick={handleCloseModal}
              >
                Close
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </div>
  );
};

export default PatientProfile;