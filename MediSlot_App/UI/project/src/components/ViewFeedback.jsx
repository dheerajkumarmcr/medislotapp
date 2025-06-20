import { useEffect, useState } from 'react'
import { Row, Col, Card, Table, Form, Badge } from 'react-bootstrap'

const ViewFeedback = () => {
  const [feedback, setFeedback] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [ratingFilter, setRatingFilter] = useState('')

  useEffect(() => {
    fetch('http://localhost:8099/api/feedbacks')
      .then(res => res.json())
      .then(data => setFeedback(data))
      .catch(err => console.error('Error fetching feedback:', err))
  }, [])

  const filteredFeedback = feedback.filter(fb => {
    const doctorName = fb.feedback_doctor?.toLowerCase() || ''
    const feedbackDesc = fb.feedback_desc?.toLowerCase() || ''
    const matchesSearch =
      doctorName.includes(searchTerm.toLowerCase()) ||
      feedbackDesc.includes(searchTerm.toLowerCase())

    const matchesRating = ratingFilter === '' || fb.feedback_rating?.toString() === ratingFilter
    return matchesSearch && matchesRating
  })

  const getRatingColor = (rating) => {
    if (rating >= 5) return 'success'
    if (rating >= 4) return 'primary'
    if (rating >= 3) return 'warning'
    return 'danger'
  }

  const renderStars = (rating) => {
    const stars = []
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <i
          key={i}
          className={`bi ${i <= rating ? 'bi-star-fill' : 'bi-star'} text-warning`}
        ></i>
      )
    }
    return stars
  }

  

  const getRatingDistribution = () => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
    feedback.forEach(fb => {
      distribution[fb.feedback_rating]++
    })
    return distribution
  }

  const ratingDistribution = getRatingDistribution()

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">View Feedback</h2>
        <Badge bg="primary" className="fs-6">
          Total: {filteredFeedback.length} feedback
        </Badge>
      </div>

      <Row className="mb-4">
        <Col md={3}>
          <Card className="border-0 shadow-sm">
            <Card.Body className="text-center">
              <i className="bi bi-chat-square-text text-primary" style={{ fontSize: '2rem' }}></i>
              <h4 className="mt-2 mb-1">{feedback.length}</h4>
              <p className="text-muted mb-0">Total Feedback</p>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={3}>
          <Card className="border-0 shadow-sm">
            <Card.Body className="text-center">
              <i className="bi bi-emoji-smile text-success" style={{ fontSize: '2rem' }}></i>
              <h4 className="mt-2 mb-1">{ratingDistribution[5] + ratingDistribution[4]}</h4>
              <p className="text-muted mb-0">Positive Reviews</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="border-0 shadow-sm">
            <Card.Body className="text-center">
              <i className="bi bi-emoji-frown text-danger" style={{ fontSize: '2rem' }}></i>
              <h4 className="mt-2 mb-1">{ratingDistribution[2] + ratingDistribution[1]}</h4>
              <p className="text-muted mb-0">Negative Reviews</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card className="border-0 shadow-sm mb-4">
        <Card.Header className="bg-white border-bottom">
          <h5 className="mb-0">Filter Feedback</h5>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={8}>
              <Form.Group className="mb-3">
                <Form.Label>Search</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Search by doctor name or feedback content..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Rating</Form.Label>
                <Form.Select
                  value={ratingFilter}
                  onChange={(e) => setRatingFilter(e.target.value)}
                >
                  <option value="">All Ratings</option>
                  <option value="5">5 Stars</option>
                  <option value="4">4 Stars</option>
                  <option value="3">3 Stars</option>
                  <option value="2">2 Stars</option>
                  <option value="1">1 Star</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Card className="border-0 shadow-sm">
        <Card.Header className="bg-white border-bottom">
          <h5 className="mb-0">Feedback List ({filteredFeedback.length})</h5>
        </Card.Header>
        <Card.Body className="p-0">
          <div className="table-responsive">
            <Table hover className="mb-0">
              <thead className="bg-light">
                <tr>
                  <th>Feedback ID</th>
                  <th>Doctor Name</th>
                  <th>Rating</th>
                  <th>Feedback</th>
                  <th>Sentiment</th>
                </tr>
              </thead>
              <tbody>
                {filteredFeedback.map((fb) => (
                  <tr key={fb.feedback_id}>
                    <td className="fw-bold">#{fb.feedback_id}</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <div className="bg-info bg-opacity-10 rounded-circle p-2 me-2">
                          <i className="bi bi-person text-info"></i>
                        </div>
                        {fb.feedback_doctor || 'Unknown Doctor'}
                      </div>
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                        <div className="me-2">{renderStars(fb.feedback_rating)}</div>
                        <Badge bg={getRatingColor(fb.feedback_rating)}>
                          {fb.feedback_rating}/5
                        </Badge>
                      </div>
                    </td>
                    <td>
                      <div style={{ maxWidth: '300px' }}>
                        {fb.feedback_desc?.length > 100
                          ? `${fb.feedback_desc.substring(0, 100)}...`
                          : fb.feedback_desc}
                      </div>
                    </td>
                    <td>
                      {fb.feedback_rating >= 4 ? (
                        <Badge bg="success">
                          <i className="bi bi-emoji-smile me-1"></i>
                          Positive
                        </Badge>
                      ) : fb.feedback_rating === 3 ? (
                        <Badge bg="warning">
                          <i className="bi bi-emoji-neutral me-1"></i>
                          Neutral
                        </Badge>
                      ) : (
                        <Badge bg="danger">
                          <i className="bi bi-emoji-frown me-1"></i>
                          Negative
                        </Badge>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          {filteredFeedback.length === 0 && (
            <div className="text-center py-5">
              <i className="bi bi-chat-square-text text-muted" style={{ fontSize: '3rem' }}></i>
              <h5 className="mt-3 text-muted">No feedback found</h5>
              <p className="text-muted">Try adjusting your search criteria</p>
            </div>
          )}
        </Card.Body>
      </Card>
    </div>
  )
}

export default ViewFeedback
