import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { animationDefaultOptions } from '../lib/utils';
import Lottie from 'react-lottie';
import { API_ENDPOINTS } from '../config/api';

const DashboardOverview = () => {
  const [stats, setStats] = useState({
    doctors: 0,
    appointments: 0,
    patients: 0,
    reports: 0,
    feedbacks: 0,
    prescriptions: 0
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [
          doctorsRes,
          appointmentsRes,
          patientsRes,
          reportsRes,
          feedbacksRes,
          prescriptionsRes
        ] = await Promise.all([
          fetch(API_ENDPOINTS.DOCTORS),
          fetch(API_ENDPOINTS.APPOINTMENTS),
          fetch(API_ENDPOINTS.PATIENTS),
          fetch(API_ENDPOINTS.REPORTS),
          fetch(API_ENDPOINTS.FEEDBACKS),
          fetch(API_ENDPOINTS.PRESCRIPTIONS)
        ]);

        const doctors = await doctorsRes.json();
        const appointments = await appointmentsRes.json();
        const patients = await patientsRes.json();
        const reports = await reportsRes.json();
        const feedbacks = await feedbacksRes.json();
        const prescriptions = await prescriptionsRes.json();

        setStats({
          doctors: doctors.length || 0,
          appointments: appointments.length || 0,
          patients: patients.length || 0,
          reports: reports.length || 0,
          feedbacks: feedbacks.length || 0,
          prescriptions: prescriptions.length || 0
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    { title: 'Total Doctors', value: stats.doctors, color: 'primary' },
    { title: 'Total Appointments', value: stats.appointments, color: 'success' },
    { title: 'Total Patients', value: stats.patients, color: 'info' },
    { title: 'Total Reports', value: stats.reports, color: 'warning' },
    { title: 'Total Feedback', value: stats.feedbacks, color: 'secondary' },
    { title: 'Total Prescriptions', value: stats.prescriptions, color: 'dark' }
  ];

  return (
    <Container fluid>
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
            {statCards.map((card, index) => (
              <Col key={index} md={4} lg={2} className="mb-3">
                <Card className={`text-white bg-${card.color}`}>
                  <Card.Body>
                    <Card.Title>{card.title}</Card.Title>
                    <Card.Text className="h2">{card.value}</Card.Text>
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
    </Container>
  );
};

export default DashboardOverview;