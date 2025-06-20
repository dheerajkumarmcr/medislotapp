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
import { useAuth } from '../context/AuthContext';

const DashboardLayout = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const { admin, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) return null;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const menuItems = [
    {
      path: '/dashboard',
      label: 'Dashboard Overview',
      icon: 'bi-speedometer2',
    },
    {
      path: '/dashboard/doctors',
      label: 'Manage Doctors',
      icon: 'bi-person-badge',
    },
    {
      path: '/dashboard/appointments',
      label: 'Manage Appointments',
      icon: 'bi-calendar-check',
    },
    
    {
      path: '/dashboard/write-report',
      label: 'Write Report',
      icon: 'bi-file-earmark-plus',
    },
    {
      path: '/dashboard/reports',
      label: 'View Reports',
      icon: 'bi-file-earmark-text',
    },
    {
      path: '/dashboard/feedback',
      label: 'View Feedback',
      icon: 'bi-chat-square-text',
    },
  ];

  const SidebarContent = () => (
    <div className="sidebar-content h-100 d-flex flex-column">
      <div className="p-3 border-bottom">
        <h5 className="mb-0 text-primary">
          <i className="bi bi-hospital me-2"></i>
          Admin Panel
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

  return (
    <div className="dashboard-layout">
      {/* Top Navbar */}
      <Navbar bg="white" expand="lg" className="border-bottom shadow-sm">
        <Container fluid>
          <Button
            variant="outline-primary"
            className="d-lg-none me-2"
            onClick={() => setShowSidebar(true)}
          >
            <i className="bi bi-list"></i>
          </Button>

          <Navbar.Brand className="fw-bold text-primary">
            Admin Dashboard
          </Navbar.Brand>

          <div className="ms-auto d-flex align-items-center">
            <span className="me-3 text-muted">
              Welcome, {admin?.name || admin?.username}
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

export default DashboardLayout;
