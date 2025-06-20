import { useState } from 'react'
import { Row, Col, Card, Form, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../context/AuthContext'

const WriteReport = () => {
  const { admin } = useAuth()
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [alertVariant, setAlertVariant] = useState('success')

  const [formData, setFormData] = useState({
    report_date: new Date().toISOString().split('T')[0],
    report_details: '',
    report_status: 'pending'
  })

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!formData.report_details.trim()) {
    setAlertMessage('Please enter report details');
    setAlertVariant('danger');
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
    return;
  }

  const reportPayload = {
    report_date: formData.report_date,
    report_details: formData.report_details,
    report_status: formData.report_status
  };

  try {
    const response = await fetch('http://localhost:8081/api/report', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(reportPayload)
    });

    if (response.ok) {
      const savedReport = await response.json(); // 💡 get saved report from backend
      setAlertMessage(`Report submitted successfully! ID: ${savedReport.report_id}`);
      setAlertVariant('success');
      setShowAlert(true);

      setFormData({
        report_date: new Date().toISOString().split('T')[0],
        report_details: '',
        report_status: 'pending'
      });
    } else {
      setAlertMessage('Failed to submit report. Try again.');
      setAlertVariant('danger');
      setShowAlert(true);
    }
  } catch (err) {
    console.error(err);
    setAlertMessage('An error occurred while submitting the report.');
    setAlertVariant('danger');
    setShowAlert(true);
  }

  setTimeout(() => setShowAlert(false), 3000);
};



  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Write Report</h2>
        <div className="text-muted">
          <i className="bi bi-person-circle me-2"></i>
          {admin?.name || admin?.username}
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
                <i className="bi bi-file-earmark-plus me-2"></i>
                Create New Report
              </h5>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Report Date</Form.Label>
                      <Form.Control
                        type="date"
                        name="report_date"
                        value={formData.report_date}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Report Status</Form.Label>
                      <Form.Select
                        name="report_status"
                        value={formData.report_status}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="pending">Pending</option>
                        <option value="completed">Completed</option>
                        <option value="draft">Draft</option>
                        <option value="review">Under Review</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-4">
                  <Form.Label>Report Details</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={8}
                    name="report_details"
                    value={formData.report_details}
                    onChange={handleInputChange}
                    placeholder="Enter detailed report information..."
                    required
                  />
                  <Form.Text className="text-muted">
                    Provide comprehensive details about the report content.
                  </Form.Text>
                </Form.Group>

                <div className="d-flex gap-2">
                  <Button variant="primary" type="submit" size="lg">
                    <i className="bi bi-check-circle me-2"></i>
                    Submit Report
                  </Button>
                  <Button 
                    variant="outline-secondary" 
                    type="button" 
                    size="lg"
                    onClick={() => setFormData({
                      report_date: new Date().toISOString().split('T')[0],
                      report_details: '',
                      report_status: 'pending'
                    })}
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
              <h6 className="mb-0">Report Guidelines</h6>
            </Card.Header>
            <Card.Body>
              <div className="small">
                <div className="mb-3">
                  <strong>Report Types:</strong>
                  <ul className="mt-2 mb-0">
                    <li>Monthly Statistics</li>
                    <li>Department Performance</li>
                    <li>Equipment Status</li>
                    <li>Staff Training</li>
                    <li>Patient Feedback Summary</li>
                  </ul>
                </div>
                <div className="mb-3">
                  <strong>Status Definitions:</strong>
                  <ul className="mt-2 mb-0">
                    <li><strong>Draft:</strong> Work in progress</li>
                    <li><strong>Pending:</strong> Awaiting review</li>
                    <li><strong>Under Review:</strong> Being evaluated</li>
                    <li><strong>Completed:</strong> Finalized report</li>
                  </ul>
                </div>
              </div>
            </Card.Body>
          </Card>

          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-white border-bottom">
              <h6 className="mb-0">Quick Stats</h6>
            </Card.Header>
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="text-muted">Reports This Month:</span>
                <span className="fw-bold">12</span>
              </div>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="text-muted">Pending Reports:</span>
                <span className="fw-bold text-warning">3</span>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <span className="text-muted">Completed Reports:</span>
                <span className="fw-bold text-success">9</span>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default WriteReport