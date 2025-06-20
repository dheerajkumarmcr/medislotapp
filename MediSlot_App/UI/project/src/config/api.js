// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

// Service endpoints
export const API_ENDPOINTS = {
  // Appointments
  APPOINTMENTS: `${API_BASE_URL}/api/appointments`,
  APPOINTMENT: (id) => `${API_BASE_URL}/api/appointment/${id}`,
  
  // Doctors
  DOCTORS: `${API_BASE_URL}/api/doctors`,
  DOCTOR: (id) => `${API_BASE_URL}/api/doctor/${id}`,
  
  // Patients
  PATIENTS: `${API_BASE_URL}/api/patients`,
  PATIENT: (id) => `${API_BASE_URL}/api/patient/${id}`,
  
  // Reports
  REPORTS: `${API_BASE_URL}/api/reports`,
  REPORT: (id) => `${API_BASE_URL}/api/report/${id}`,
  
  // Feedback
  FEEDBACKS: `${API_BASE_URL}/api/feedbacks`,
  FEEDBACK: (id) => `${API_BASE_URL}/api/feedback/${id}`,
  
  // Prescriptions
  PRESCRIPTIONS: `${API_BASE_URL}/api/prescriptions`,
  PRESCRIPTION: (id) => `${API_BASE_URL}/api/prescription/${id}`,
};

export default API_BASE_URL; 