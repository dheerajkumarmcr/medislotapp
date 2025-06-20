import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  // Admin
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [admin, setAdmin] = useState(null);

  // Doctor
  const [isDoctorAuthenticated, setIsDoctorAuthenticated] = useState(false);
  const [doctor, setDoctor] = useState(null);

  // Patient
  const [isPatientAuthenticated, setIsPatientAuthenticated] = useState(false);
  const [patient, setPatient] = useState(null);

  // Admin login
  const login = (username, password) => {
    if (username === 'admin' && password === 'admin123') {
      setIsAuthenticated(true);
      setAdmin({
        id: 1,
        username: 'admin',
        email: 'admin@hospital.com',
        name: 'Administrator',
      });
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setAdmin(null);
  };

  // Doctor logout
  const logoutDoctor = () => {
    setIsDoctorAuthenticated(false);
    setDoctor(null);
  };

  // Patient login/logout
  const loginPatient = (token, patientData) => {
  // 1. Set authentication to true
  setIsPatientAuthenticated(true);
  
  // 2. Save patient data (like name, email, etc.)
  setPatient(patientData);
  
  // 3. Return true to indicate successful login
  return true;
};

  const logoutPatient = () => {
    setIsPatientAuthenticated(false);
    setPatient(null);
  };

  const value = {
    // Admin
    isAuthenticated,
    admin,
    login,
    logout,
    // Doctor
    isDoctorAuthenticated,
    doctor,
    logoutDoctor,
    setDoctorAuthenticated: setIsDoctorAuthenticated,
    setDoctorData: setDoctor,
    // Patient
    isPatientAuthenticated,
    patient,
    loginPatient,
    logoutPatient,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
