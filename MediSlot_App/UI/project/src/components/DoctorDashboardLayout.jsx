import { useState, useEffect } from 'react';
import {
  Container,
  Row,
  Col,
  Navbar,
  Nav,
  Button,
  Offcanvas,
} from 'react-bootstrap';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

const DoctorDashboardLayout = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [doctor, setDoctor] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Check authentication on component mount
  useEffect(() => {
    const storedDoctor = localStorage.getItem('doctorData');
    if (!storedDoctor) {
      navigate('/doctor-login');
    } else {
      setDoctor(JSON.parse(storedDoctor));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('doctorAuth');
    localStorage.removeItem('doctorData');
    navigate('/doctor-login');
  };

  const menuItems = [
    {
      path: '/doctor-dashboard',
      label: 'My Profile',
      icon: 'bi-person-circle',
    },
    {
      path: '/doctor-dashboard/appointments',
      label: 'My Appointments',
      icon: 'bi-calendar-check',
    },
    {
      path: '/doctor-dashboard/prescriptions',
      label: 'Write Prescription',
      icon: 'bi-prescription2',
    },
    {
      path: '/doctor-dashboard/reports',
      label: 'View Reports',
      icon: 'bi-file-earmark-text',
    },
  ];

  const SidebarContent = () => (
    <div className="sidebar-content h-100 d-flex flex-column">
      <div className="p-3 border-bottom">
        <h5 className="mb-0 text-success">
          <i className="bi bi-person-badge me-2"></i>
          Doctor Portal
        </h5>
      </div>
      <Nav className="flex-column flex-grow-1 p-3">
        {menuItems.map((item) => (
          <Nav.Link
            key={item.path}
            onClick={() => {
              navigate(item.path);
              setShowSidebar(false);
            }}
            className={`sidebar-nav-link ${
              location.pathname === item.path ? 'active' : ''
            }`}
          >
            <i className={`${item.icon} me-2`}></i>
            {item.label}
          </Nav.Link>
        ))}
      </Nav>
    </div>
  );

  // Show nothing while checking auth status
  if (!doctor) return null;

  return (
    <div className="dashboard-layout">
      {/* Top Navbar */}
      <Navbar bg="white" expand="lg" className="border-bottom shadow-sm">
        <Container fluid>
          <Button
            variant="outline-success"
            className="d-lg-none me-2"
            onClick={() => setShowSidebar(true)}
          >
            <i className="bi bi-list"></i>
          </Button>

          <Navbar.Brand className="fw-bold text-success">
            Doctor Dashboard
          </Navbar.Brand>

          <div className="ms-auto d-flex align-items-center">
            <span className="me-3 text-muted">
              Welcome, {doctor?.doctor_name}
            </span>
            <Button variant="outline-danger" size="sm" onClick={handleLogout}>
              <i className="bi bi-box-arrow-right me-1"></i>
              Logout
            </Button>
          </div>
        </Container>
      </Navbar>

      <div className="d-flex">
        {/* Desktop Sidebar */}
        <div
          className="sidebar d-none d-lg-block bg-light border-end"
          style={{ width: '250px', minHeight: 'calc(100vh - 56px)' }}
        >
          <SidebarContent />
        </div>

        {/* Mobile Sidebar */}
        <Offcanvas
          show={showSidebar}
          onHide={() => setShowSidebar(false)}
          placement="start"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Menu</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className="p-0">
            <SidebarContent />
          </Offcanvas.Body>
        </Offcanvas>

        {/* Main Content */}
        <div
          className="flex-grow-1"
          style={{ minHeight: 'calc(100vh - 56px)' }}
        >
          <Container fluid className="p-4">
            <Outlet />
          </Container>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboardLayout;