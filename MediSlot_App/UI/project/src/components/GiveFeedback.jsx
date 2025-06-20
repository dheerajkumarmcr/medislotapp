import { useState } from 'react'
import { Row, Col, Card, Form, Button, Alert, Spinner } from 'react-bootstrap'
import { useAuth } from '../context/AuthContext'

const GiveFeedback = () => {
  const { patient } = useAuth()
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [alertVariant, setAlertVariant] = useState('success')
  const [isLoading, setIsLoading] = useState(false)

  const [formData, setFormData] = useState({
    feedback_doctor: '',
    feedback_rating: '',
    feedback_desc: ''
  })

  // API base URL
  const API_URL = 'http://localhost:8099/api/feedback'

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.feedback_doctor || !formData.feedback_rating || !formData.feedback_desc.trim()) {
      setAlertMessage('Please fill in all required fields')
      setAlertVariant('danger')
      setShowAlert(true)
      setTimeout(() => setShowAlert(false), 3000)
      return
    }

    try {
      setIsLoading(true)
      const newFeedback = {
        ...formData,
        feedback_rating: parseInt(formData.feedback_rating),
        patient_id: patient?.patientid,
        patient_name: patient?.patientName,
        feedback_date: new Date().toISOString().split('T')[0]
      }

      // Send to API using fetch
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newFeedback)
      })

      if (!response.ok) {
        throw new Error('Failed to submit feedback')
      }

      await response.json()
      
      setAlertMessage('Feedback submitted successfully!')
      setAlertVariant('success')
      setShowAlert(true)
      
      // Reset form
      setFormData({
        feedback_doctor: '',
        feedback_rating: '',
        feedback_desc: ''
      })
    } catch (error) {
      console.error('Error submitting feedback:', error)
      setAlertMessage('Failed to submit feedback. Please try again.')
      setAlertVariant('danger')
      setShowAlert(true)
    } finally {
      setIsLoading(false)
      setTimeout(() => setShowAlert(false), 5000)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const renderStars = (rating, interactive = false, onStarClick = null) => {
    const stars = []
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <i
          key={i}
          className={`bi ${i <= rating ? 'bi-star-fill' : 'bi-star'} text-warning ${interactive ? 'star-interactive' : ''}`}
          style={{ 
            fontSize: '1.5rem', 
            marginRight: '0.25rem',
            cursor: interactive ? 'pointer' : 'default'
          }}
          onClick={interactive ? () => onStarClick(i) : undefined}
        ></i>
      )
    }
    return stars
  }

  const handleStarClick = (rating) => {
    setFormData(prev => ({
      ...prev,
      feedback_rating: rating.toString()
    }))
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Give Feedback</h2>
        <div className="text-muted">
          <i className="bi bi-person-heart me-2"></i>
          {patient?.patientName}
        </div>
      </div>

      {showAlert && (
        <Alert variant={alertVariant} dismissible onClose={() => setShowAlert(false)}>
          {alertMessage}
        </Alert>
      )}

      <Row>
        <Col lg={8}>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-white border-bottom">
              <h5 className="mb-0">
                <i className="bi bi-chat-square-text me-2"></i>
                Share Your Experience
              </h5>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Doctor Name *</Form.Label>
                  <Form.Control
                    type="text"
                    name="feedback_doctor"
                    value={formData.feedback_doctor}
                    onChange={handleInputChange}
                    placeholder="Enter the doctor's name"
                    required
                    size="lg"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Rating *</Form.Label>
                  <div className="mb-2">
                    {renderStars(parseInt(formData.feedback_rating) || 0, true, handleStarClick)}
                  </div>
                  <Form.Text className="text-muted">
                    Click on the stars to rate your experience (1 = Poor, 5 = Excellent)
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Your Feedback *</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    name="feedback_desc"
                    value={formData.feedback_desc}
                    onChange={handleInputChange}
                    placeholder="Please share your experience with the doctor and the treatment you received..."
                    required
                  />
                  <Form.Text className="text-muted">
                    Your feedback helps us improve our services and helps other patients make informed decisions.
                  </Form.Text>
                </Form.Group>

                <div className="d-flex gap-2">
                  <Button variant="info" type="submit" size="lg" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                        <span className="ms-2">Submitting...</span>
                      </>
                    ) : (
                      <>
                        <i className="bi bi-send me-2"></i>
                        Submit Feedback
                      </>
                    )}
                  </Button>
                  <Button 
                    variant="outline-secondary" 
                    type="button" 
                    size="lg"
                    onClick={() => setFormData({
                      feedback_doctor: '',
                      feedback_rating: '',
                      feedback_desc: ''
                    })}
                    disabled={isLoading}
                  >
                    <i className="bi bi-arrow-clockwise me-2"></i>
                    Reset Form
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          <Card className="border-0 shadow-sm mb-4">
            <Card.Header className="bg-white border-bottom">
              <h6 className="mb-0">Feedback Guidelines</h6>
            </Card.Header>
            <Card.Body>
              <div className="small">
                <div className="mb-3">
                  <strong>Please include:</strong>
                  <ul className="mt-2 mb-0">
                    <li>Quality of care received</li>
                    <li>Doctor's communication</li>
                    <li>Treatment effectiveness</li>
                    <li>Overall experience</li>
                  </ul>
                </div>
                <div className="mb-3">
                  <strong>Rating Scale:</strong>
                  <ul className="mt-2 mb-0">
                    <li>⭐ - Poor</li>
                    <li>⭐⭐ - Fair</li>
                    <li>⭐⭐⭐ - Good</li>
                    <li>⭐⭐⭐⭐ - Very Good</li>
                    <li>⭐⭐⭐⭐⭐ - Excellent</li>
                  </ul>
                </div>
              </div>
            </Card.Body>
          </Card>

          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-white border-bottom">
              <h6 className="mb-0">Your Impact</h6>
            </Card.Header>
            <Card.Body>
              <div className="text-center">
                <div className="bg-info bg-opacity-10 rounded-circle p-3 mb-3 mx-auto" style={{ width: '80px', height: '80px' }}>
                  <i className="bi bi-heart text-info" style={{ fontSize: '2rem' }}></i>
                </div>
                <h6 className="fw-bold">Help Others</h6>
                <p className="text-muted small mb-0">
                  Your feedback helps other patients choose the right doctor and helps our medical staff improve their services.
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default GiveFeedback