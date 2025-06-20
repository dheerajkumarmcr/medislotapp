import { Routes, Route, Navigate } from 'react-router-dom'
import { useState } from 'react'
import LandingPage from './components/LandingPage'
import LoginPage from './components/LoginPage'
import DoctorLoginPage from './components/DoctorLoginPage'
import PatientLoginPage from './components/PatientLoginPage'
import DashboardLayout from './components/DashboardLayout'
import DoctorDashboardLayout from './components/DoctorDashboardLayout'
import PatientDashboardLayout from './components/PatientDashboardLayout'
import DashboardOverview from './components/DashboardOverview'
import ManageDoctors from './components/ManageDoctors'
import ManageAppointments from './components/ManageAppointments'
import ViewPatients from './components/ViewPatients'
import WriteReport from './components/WriteReport'
import ViewReports from './components/ViewReports'
import ViewFeedback from './components/ViewFeedback'
import DoctorProfile from './components/DoctorProfile'
import DoctorAppointments from './components/DoctorAppointments'
import WritePrescription from './components/WritePrescription'
import DoctorReports from './components/DoctorReports'
import PatientProfile from './components/PatientProfile'
import BookAppointment from './components/BookAppointment'
import PatientAppointments from './components/PatientAppointments'
import ViewPrescriptions from './components/ViewPrescriptions'
import GiveFeedback from './components/GiveFeedback'
import { AuthProvider } from './context/AuthContext'

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin-login" element={<LoginPage />} />
        <Route path="/doctor-login" element={<DoctorLoginPage />} />
        <Route path="/patient-login" element={<PatientLoginPage />} />
        
        {/* Admin Dashboard */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardOverview />} />
          <Route path="doctors" element={<ManageDoctors />} />
          <Route path="appointments" element={<ManageAppointments />} />
          <Route path="patients" element={<ViewPatients />} />
          <Route path="write-report" element={<WriteReport />} />
          <Route path="reports" element={<ViewReports />} />
          <Route path="feedback" element={<ViewFeedback />} />
        </Route>

        {/* Doctor Dashboard */}
        <Route path="/doctor-dashboard" element={<DoctorDashboardLayout />}>
          <Route index element={<DoctorProfile />} />
          <Route path="profile" element={<DoctorProfile />} />
          <Route path="appointments" element={<DoctorAppointments />} />
          <Route path="prescriptions" element={<WritePrescription />} />
          <Route path="reports" element={<DoctorReports />} />
        </Route>

        {/* Patient Dashboard */}
        <Route path="/patient-dashboard" element={<PatientDashboardLayout />}>
          <Route index element={<PatientProfile />} />
          <Route path="profile" element={<PatientProfile />} />
          <Route path="book-appointment" element={<BookAppointment />} />
          <Route path="appointments" element={<PatientAppointments />} />
          <Route path="prescriptions" element={<ViewPrescriptions />} />
          <Route path="feedback" element={<GiveFeedback />} />
        </Route>
      </Routes>
    </AuthProvider>
  )
}

export default App