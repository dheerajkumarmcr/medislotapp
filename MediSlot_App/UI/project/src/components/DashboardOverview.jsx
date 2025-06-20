import { Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { animationDefaultOptions } from '../lib/utils';
import Lottie from 'react-lottie';

const DashboardOverview = () => {
  const [stats, setStats] = useState([
    { title: 'Total Doctors', value: '0', icon: 'bi-person-badge', color: 'primary' },
    { title: 'Total Appointments', value: '0', icon: 'bi-calendar-check', color: 'success' },
    { title: 'Total Patients', value: '0', icon: 'bi-people', color: 'info' },
    { title: 'Total Reports', value: '0', icon: 'bi-file-earmark-text', color: 'warning' },
    { title: 'Total Feedback', value: '0', icon: 'bi-chat-square-text', color: 'secondary' },
    { title: 'Prescriptions Written', value: '0', icon: 'bi-prescription', color: 'danger' },
  ]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all data in parallel
        const [doctorsRes, appointmentsRes, patientsRes, reportsRes, feedbackRes, prescriptionsRes] =
          await Promise.all([
            fetch('http://localhost:8083/api/doctors'),
            fetch('http://localhost:8084/api/appointments'),
            fetch('http://localhost:8087/api/patients'),
            fetch('http://localhost:8081/api/reports'),
            fetch('http://localhost:8099/api/feedbacks'),
            fetch('http://localhost:8089/api/prescriptions')
          ]);

        const [doctors, appointments, patients, reports, feedbacks, prescriptions] =
          await Promise.all([
            doctorsRes.json(),
            appointmentsRes.json(),
            patientsRes.json(),
            reportsRes.json(),
            feedbackRes.json(),
            prescriptionsRes.json()
          ]);

        setStats([
          { ...stats[0], value: doctors.length.toString() },
          { ...stats[1], value: appointments.length.toString() },
          { ...stats[2], value: patients.length.toString() },
          { ...stats[3], value: reports.length.toString() }, // Total reports count
          { ...stats[4], value: feedbacks.length.toString() },
          { ...stats[5], value: prescriptions.length.toString() },
        ]);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Dashboard Overview</h2>
        <small className="text-muted">
          Last updated: {new Date().toLocaleString()}
        </small>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading dashboard data...</p>
        </div>
      ) : (
        <>
          <Row>
            {stats.map((stat, index) => (
              <Col md={6} lg={4} key={index} className="mb-4">
                <Card className="h-100 border-0 shadow-sm">
                  <Card.Body className="d-flex align-items-center">
                    <div
                      className={`rounded-circle bg-${stat.color} bg-opacity-10 p-3 me-3`}
                    >
                      <i
                        className={`${stat.icon} text-${stat.color}`}
                        style={{ fontSize: '1.5rem' }}
                      ></i>
                    </div>
                    <div>
                      <h3 className="mb-1 fw-bold">{stat.value}</h3>
                      <p className="mb-0 text-muted">{stat.title}</p>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          <Row className="mt-4">
            <Col lg={8}>
              <Lottie
                isClickToPauseDisabled={true}
                height={200}
                width={200}
                options={animationDefaultOptions}
              />
            </Col>
            <Col lg={4}>
              <Card className="border-0 shadow-sm">
                <Card.Header className="bg-white border-bottom">
                  <h5 className="mb-0">Quick Actions</h5>
                </Card.Header>
                <Card.Body>
                  <div className="d-grid gap-2">
                    <button
                      className="btn btn-outline-primary"
                      onClick={() => navigate('/dashboard/doctors')}
                    >
                      <i className="bi bi-person-plus me-2"></i>
                      Add New Doctor
                    </button>
                    <button
                      className="btn btn-outline-success"
                      onClick={() => navigate('/dashboard/appointments')}
                    >
                      <i className="bi bi-calendar-plus me-2"></i>
                      Schedule Appointment
                    </button>
                    <button
                      className="btn btn-outline-info"
                      onClick={() => navigate('/dashboard/write-report')}
                    >
                      <i className="bi bi-file-earmark-plus me-2"></i>
                      Create Report
                    </button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </div>
  );
};

export default DashboardOverview;