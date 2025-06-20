import { useEffect, useState } from 'react'
import { Row, Col, Card, Table, Badge, Button, Modal, Spinner, Alert, Form } from 'react-bootstrap'
import { useAuth } from '../context/AuthContext'

const DoctorReports = () => {
  const { doctor } = useAuth()
  const [reports, setReports] = useState([])
  const [filteredReports, setFilteredReports] = useState([])
  const [selectedReport, setSelectedReport] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchDate, setSearchDate] = useState('')

  useEffect(() => {
    fetch('http://localhost:8081/api/reports')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch reports')
        }
        return response.json()
      })
      .then((data) => {
        setReports(data)
        setFilteredReports(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    if (searchDate) {
      const filtered = reports.filter(report => 
        new Date(report.report_date).toLocaleDateString() === new Date(searchDate).toLocaleDateString()
      )
      setFilteredReports(filtered)
    } else {
      setFilteredReports(reports)
    }
  }, [searchDate, reports])

  const getStatusColor = (status) => {
    const colors = {
      pending: 'warning',
      completed: 'success',
      draft: 'secondary',
      review: 'info'
    }
    return colors[status] || 'secondary'
  }

  const handleViewDetails = (report) => {
    setSelectedReport(report)
    setShowModal(true)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">View Reports</h2>
        <Badge bg="success" className="fs-6">
          Total: {filteredReports.length} reports
        </Badge>
      </div>

      {loading && (
        <div className="text-center py-5">
          <Spinner animation="border" variant="primary" />
          <p>Loading reports...</p>
        </div>
      )}

      {error && (
        <Alert variant="danger">
          <strong>Error:</strong> {error}
        </Alert>
      )}

      {!loading && !error && (
        <>
          <Row className="mb-4">
            <Col md={3}>
              <Card className="border-0 shadow-sm">
                <Card.Body className="text-center">
                  <i className="bi bi-file-earmark-text text-primary" style={{ fontSize: '2rem' }}></i>
                  <h4 className="mt-2 mb-1">{reports.length}</h4>
                  <p className="text-muted mb-0">Total Reports</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="border-0 shadow-sm">
                <Card.Body className="text-center">
                  <i className="bi bi-check-circle text-success" style={{ fontSize: '2rem' }}></i>
                  <h4 className="mt-2 mb-1">{reports.filter(r => r.report_status === 'completed').length}</h4>
                  <p className="text-muted mb-0">Completed</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="border-0 shadow-sm">
                <Card.Body className="text-center">
                  <i className="bi bi-clock text-warning" style={{ fontSize: '2rem' }}></i>
                  <h4 className="mt-2 mb-1">{reports.filter(r => r.report_status === 'pending').length}</h4>
                  <p className="text-muted mb-0">Pending</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="border-0 shadow-sm">
                <Card.Body className="text-center">
                  <i className="bi bi-eye text-info" style={{ fontSize: '2rem' }}></i>
                  <h4 className="mt-2 mb-1">{reports.filter(r => r.report_status === 'review').length}</h4>
                  <p className="text-muted mb-0">Under Review</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Card className="border-0 shadow-sm mb-4">
            <Card.Body>
              <Form.Group controlId="searchDate">
                <Form.Label>Filter by Date</Form.Label>
                <div className="d-flex gap-2">
                  <Form.Control 
                    type="date" 
                    value={searchDate}
                    onChange={(e) => setSearchDate(e.target.value)}
                  />
                  {searchDate && (
                    <Button 
                      variant="outline-secondary" 
                      onClick={() => setSearchDate('')}
                    >
                      Clear
                    </Button>
                  )}
                </div>
              </Form.Group>
            </Card.Body>
          </Card>

          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-white border-bottom">
              <h5 className="mb-0">Hospital Reports</h5>
              <small className="text-muted">Reports relevant to your department and practice</small>
            </Card.Header>
            <Card.Body className="p-0">
              <div className="table-responsive">
                <Table hover className="mb-0">
                  <thead className="bg-light">
                    <tr>
                      <th>Report ID</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Details Preview</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredReports.map((report) => (
                      <tr key={report.report_id}>
                        <td className="fw-bold">#{report.report_id}</td>
                        <td>
                          <div>
                            <div className="fw-semibold">
                              {formatDate(report.report_date)}
                            </div>
                            <small className="text-muted">
                              {new Date(report.report_date).toLocaleDateString('en-US', { weekday: 'long' })}
                            </small>
                          </div>
                        </td>
                        <td>
                          <Badge bg={getStatusColor(report.report_status)} className="text-capitalize">
                            <i className={`bi ${report.report_status === 'completed' ? 'bi-check-circle' :
                              report.report_status === 'pending' ? 'bi-clock' :
                                report.report_status === 'draft' ? 'bi-pencil' : 'bi-eye'} me-1`}></i>
                            {report.report_status}
                          </Badge>
                        </td>
                        <td>
                          <div style={{ maxWidth: '300px' }}>
                            {report.report_details.length > 80
                              ? `${report.report_details.substring(0, 80)}...`
                              : report.report_details}
                          </div>
                        </td>
                        <td>
                          <Button
                            variant="outline-primary"
                            size="sm"
                            onClick={() => handleViewDetails(report)}
                          >
                            <i className="bi bi-eye me-1"></i>
                            View
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
              {filteredReports.length === 0 && (
                <div className="text-center py-5">
                  <i className="bi bi-file-earmark-text text-muted" style={{ fontSize: '3rem' }}></i>
                  <h5 className="mt-3 text-muted">No reports available</h5>
                  <p className="text-muted">{searchDate ? 'No reports match your filter' : 'Reports will appear here when available'}</p>
                </div>
              )}
            </Card.Body>
          </Card>
        </>
      )}

      {/* Report Details Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            <i className="bi bi-file-earmark-text me-2"></i>
            Report Details - #{selectedReport?.report_id}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedReport && (
            <div>
              <Row className="mb-3">
                <Col md={6}>
                  <strong>Report Date:</strong>
                  <p className="mb-0">{formatDate(selectedReport.report_date)}</p>
                </Col>
                <Col md={6}>
                  <strong>Status:</strong>
                  <div>
                    <Badge bg={getStatusColor(selectedReport.report_status)} className="text-capitalize">
                      {selectedReport.report_status}
                    </Badge>
                  </div>
                </Col>
              </Row>
              <div className="mb-3">
                <strong>Admin ID:</strong>
                <p className="mb-0">#{selectedReport.admin_id}</p>
              </div>
              <div>
                <strong>Report Details:</strong>
                <div className="mt-2 p-3 bg-light rounded">
                  {selectedReport.report_details}
                </div>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default DoctorReports