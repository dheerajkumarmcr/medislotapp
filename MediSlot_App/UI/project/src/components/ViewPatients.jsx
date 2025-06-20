import { useState } from 'react';
import { Row, Col, Card, Table, Form, Badge } from 'react-bootstrap';
import { patients } from '../data/dummyData';

const ViewPatients = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [genderFilter, setGenderFilter] = useState('');
  const [ageFilter, setAgeFilter] = useState('');

  const filteredPatients = patients.filter((patient) => {
    const matchesSearch =
      patient.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.patientEmail.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesGender =
      genderFilter === '' || patient.patientGender === genderFilter;

    const matchesAge =
      ageFilter === '' ||
      (ageFilter === 'young' && patient.patientAge < 30) ||
      (ageFilter === 'middle' &&
        patient.patientAge >= 30 &&
        patient.patientAge < 50) ||
      (ageFilter === 'senior' && patient.patientAge >= 50);

    return matchesSearch && matchesGender && matchesAge;
  });

  const getAgeGroup = (age) => {
    if (age < 30) return { label: 'Young', color: 'success' };
    if (age < 50) return { label: 'Middle-aged', color: 'warning' };
    return { label: 'Senior', color: 'info' };
  };

  const getGenderIcon = (gender) => {
    return gender === 'Male'
      ? 'bi-person-standing'
      : 'bi-person-standing-dress';
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">View Patients</h2>
        <Badge bg="primary" className="fs-6">
          Total: {filteredPatients.length} patients
        </Badge>
      </div>

      <Card className="border-0 shadow-sm mb-4">
        <Card.Header className="bg-white border-bottom">
          <h5 className="mb-0">Filter Patients</h5>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Search</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Search by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Gender</Form.Label>
                <Form.Select
                  value={genderFilter}
                  onChange={(e) => setGenderFilter(e.target.value)}
                >
                  <option value="">All Genders</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Age Group</Form.Label>
                <Form.Select
                  value={ageFilter}
                  onChange={(e) => setAgeFilter(e.target.value)}
                >
                  <option value="">All Ages</option>
                  <option value="young">Young (Under 30)</option>
                  <option value="middle">Middle-aged (30-49)</option>
                  <option value="senior">Senior (50+)</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Card className="border-0 shadow-sm">
        <Card.Header className="bg-white border-bottom">
          <h5 className="mb-0">Patients List ({filteredPatients.length})</h5>
        </Card.Header>
        <Card.Body className="p-0">
          <div className="table-responsive">
            <Table hover className="mb-0">
              <thead className="bg-light">
                <tr>
                  <th>Patient ID</th>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Gender</th>
                  <th>Email</th>
                  <th>Age Group</th>
                </tr>
              </thead>
              <tbody>
                {filteredPatients.map((patient) => {
                  const ageGroup = getAgeGroup(patient.patientAge);
                  return (
                    <tr key={patient.patientid}>
                      <td className="fw-bold">{patient.patientid}</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="bg-primary bg-opacity-10 rounded-circle p-2 me-2">
                            <i
                              className={`${getGenderIcon(
                                patient.patientGender
                              )} text-primary`}
                            ></i>
                          </div>
                          <div>
                            <div className="fw-semibold">
                              {patient.patientName}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="fw-semibold">
                          {patient.patientAge}
                        </span>{' '}
                        years
                      </td>
                      <td>
                        <Badge
                          bg={
                            patient.patientGender === 'Male'
                              ? 'primary'
                              : 'danger'
                          }
                        >
                          <i
                            className={`${getGenderIcon(
                              patient.patientGender
                            )} me-1`}
                          ></i>
                          {patient.patientGender}
                        </Badge>
                      </td>
                      <td>
                        <a
                          href={`mailto:${patient.patientEmail}`}
                          className="text-decoration-none"
                        >
                          <i className="bi bi-envelope me-1"></i>
                          {patient.patientEmail}
                        </a>
                      </td>
                      <td>
                        <Badge bg={ageGroup.color}>{ageGroup.label}</Badge>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
          {filteredPatients.length === 0 && (
            <div className="text-center py-5">
              <i
                className="bi bi-search text-muted"
                style={{ fontSize: '3rem' }}
              ></i>
              <h5 className="mt-3 text-muted">No patients found</h5>
              <p className="text-muted">Try adjusting your search criteria</p>
            </div>
          )}
        </Card.Body>
      </Card>

      {/* Statistics Cards */}
      <Row className="mt-4">
        <Col md={3}>
          <Card className="border-0 shadow-sm">
            <Card.Body className="text-center">
              <i
                className="bi bi-people text-primary"
                style={{ fontSize: '2rem' }}
              ></i>
              <h4 className="mt-2 mb-1">{patients.length}</h4>
              <p className="text-muted mb-0">Total Patients</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="border-0 shadow-sm">
            <Card.Body className="text-center">
              <i
                className="bi bi-person-standing text-primary"
                style={{ fontSize: '2rem' }}
              ></i>
              <h4 className="mt-2 mb-1">
                {patients.filter((p) => p.patientGender === 'Male').length}
              </h4>
              <p className="text-muted mb-0">Male Patients</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="border-0 shadow-sm">
            <Card.Body className="text-center">
              <i
                className="bi bi-person-standing-dress text-danger"
                style={{ fontSize: '2rem' }}
              ></i>
              <h4 className="mt-2 mb-1">
                {patients.filter((p) => p.patientGender === 'Female').length}
              </h4>
              <p className="text-muted mb-0">Female Patients</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="border-0 shadow-sm">
            <Card.Body className="text-center">
              <i
                className="bi bi-graph-up text-success"
                style={{ fontSize: '2rem' }}
              ></i>
              <h4 className="mt-2 mb-1">
                {Math.round(
                  patients.reduce((sum, p) => sum + p.patientAge, 0) /
                    patients.length
                )}
              </h4>
              <p className="text-muted mb-0">Average Age</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ViewPatients;
