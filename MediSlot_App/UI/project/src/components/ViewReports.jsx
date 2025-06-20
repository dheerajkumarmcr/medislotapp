import { useState, useEffect } from 'react'
import { Row, Col, Card, Table, Form, Badge, Button, Modal } from 'react-bootstrap'

const ViewReports = () => {
  const [reports, setReports] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [selectedReport, setSelectedReport] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [editFormData, setEditFormData] = useState({
    report_date: '',
    report_status: '',
    report_details: ''
  })

  const fetchReports = () => {
    fetch('http://localhost:8081/api/reports')
      .then(response => response.json())
      .then(data => setReports(data))
      .catch(error => console.error('Error fetching reports:', error))
  }

  useEffect(() => {
    fetchReports()
  }, [])

  const filteredReports = reports.filter(report => {
    const matchesSearch =
      report.report_details.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.report_id.toString().includes(searchTerm)
    const matchesStatus = statusFilter === '' || report.report_status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status) => {
    const colors = {
      'pending': 'warning',
      'completed': 'success',
      'draft': 'secondary',
      'review': 'info'
    }
    return colors[status] || 'secondary'
  }

  const handleViewDetails = (report, isEdit = false) => {
    setSelectedReport(report)
    setEditMode(isEdit)
    if (isEdit) {
      setEditFormData({
        report_date: report.report_date,
        report_status: report.report_status,
        report_details: report.report_details
      })
    }
    setShowModal(true)
  }

  const handleDelete = (reportId) => {
    if (window.confirm(`Are you sure you want to delete report #${reportId}?`)) {
      fetch(`http://localhost:8081/api/report/${reportId}`, {
        method: 'DELETE'
      })
        .then(() => {
          fetchReports()
        })
        .catch(error => console.error('Error deleting report:', error))
    }
  }

  const handleEditChange = (e) => {
    setEditFormData({
      ...editFormData,
      [e.target.name]: e.target.value
    })
  }

  const handleEditSubmit = () => {
    fetch(`http://localhost:8081/api/report/${selectedReport.report_id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editFormData)
    })
      .then(res => res.json())
      .then(() => {
        setShowModal(false)
        fetchReports()
      })
      .catch(error => console.error('Error updating report:', error))
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
        <Badge bg="primary" className="fs-6">Total: {filteredReports.length} reports</Badge>
      </div>

      {/* Filters */}
      <Card className="border-0 shadow-sm mb-4">
        <Card.Header className="bg-white border-bottom"><h5>Filter Reports</h5></Card.Header>
        <Card.Body>
          <Row>
            <Col md={8}>
              <Form.Group className="mb-3">
                <Form.Label>Search</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Search by report ID or content..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Status</Form.Label>
                <Form.Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                  <option value="">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                  <option value="draft">Draft</option>
                  <option value="review">Under Review</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Report Table */}
      <Card className="border-0 shadow-sm">
        <Card.Header className="bg-white border-bottom"><h5>Reports List ({filteredReports.length})</h5></Card.Header>
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
                        <div className="fw-semibold">{formatDate(report.report_date)}</div>
                        <small className="text-muted">
                          {new Date(report.report_date).toLocaleDateString('en-US', { weekday: 'long' })}
                        </small>
                      </div>
                    </td>
                    <td>
                      <Badge bg={getStatusColor(report.report_status)} className="text-capitalize">
                        <i className={`bi ${
                          report.report_status === 'completed' ? 'bi-check-circle' :
                          report.report_status === 'pending' ? 'bi-clock' :
                          report.report_status === 'draft' ? 'bi-pencil' : 'bi-eye'} me-1`}></i>
                        {report.report_status}
                      </Badge>
                    </td>
                    <td>
                      <div style={{ maxWidth: '300px' }}>
                        {report.report_details.length > 80
                          ? `${report.report_details.substring(0, 80)}...`
                          : report.report_details
                        }
                      </div>
                    </td>
                    <td>
                      <Button variant="outline-primary" size="sm" className="me-2" onClick={() => handleViewDetails(report, false)}>
                        <i className="bi bi-eye me-1"></i> View
                      </Button>
                      <Button variant="outline-secondary" size="sm" className="me-2" onClick={() => handleViewDetails(report, true)}>
                        <i className="bi bi-pencil-square me-1"></i> Edit
                      </Button>
                      <Button variant="outline-danger" size="sm" onClick={() => handleDelete(report.report_id)}>
                        <i className="bi bi-trash me-1"></i> Delete
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
              <h5 className="mt-3 text-muted">No reports found</h5>
              <p className="text-muted">Try adjusting your search criteria</p>
            </div>
          )}
        </Card.Body>
      </Card>

      {/* Stats */}
      <Row className="mt-4">
        {['Total Reports', 'Completed', 'Pending', 'Draft'].map((label, i) => {
          const icon = ['file-earmark-text', 'check-circle', 'clock', 'pencil'][i]
          const color = ['primary', 'success', 'warning', 'secondary'][i]
          const count = [
            reports.length,
            reports.filter(r => r.report_status === 'completed').length,
            reports.filter(r => r.report_status === 'pending').length,
            reports.filter(r => r.report_status === 'draft').length
          ][i]

          return (
            <Col md={3} key={label}>
              <Card className="border-0 shadow-sm">
                <Card.Body className="text-center">
                  <i className={`bi bi-${icon} text-${color}`} style={{ fontSize: '2rem' }}></i>
                  <h4 className="mt-2 mb-1">{count}</h4>
                  <p className="text-muted mb-0">{label}</p>
                </Card.Body>
              </Card>
            </Col>
          )
        })}
      </Row>

      {/* View/Edit Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            <i className="bi bi-file-earmark-text me-2"></i>
            {editMode ? 'Edit Report' : `Report Details - #${selectedReport?.report_id}`}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedReport && !editMode && (
            <>
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
            </>
          )}
          {editMode && (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Report Date</Form.Label>
                <Form.Control
                  type="date"
                  name="report_date"
                  value={editFormData.report_date}
                  onChange={handleEditChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Status</Form.Label>
                <Form.Select
                  name="report_status"
                  value={editFormData.report_status}
                  onChange={handleEditChange}
                >
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                  <option value="draft">Draft</option>
                  <option value="review">Under Review</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Report Details</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  name="report_details"
                  value={editFormData.report_details}
                  onChange={handleEditChange}
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          {editMode ? (
            <>
              <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
              <Button variant="primary" onClick={handleEditSubmit}>Save Changes</Button>
            </>
          ) : (
            <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default ViewReports
