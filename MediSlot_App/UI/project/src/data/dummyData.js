// Dummy data for the admin dashboard

export const doctors = [
  {
    doctor_id: 1,
    doctor_name: "Dr. Sarah Johnson",
    doctor_dept: "Cardiology",
    doctor_mail: "sarah.johnson@hospital.com",
    doctor_desc: "Experienced cardiologist with 15 years of practice specializing in heart disease prevention and treatment."
  },
  {
    doctor_id: 2,
    doctor_name: "Dr. Michael Chen",
    doctor_dept: "Neurology",
    doctor_mail: "michael.chen@hospital.com",
    doctor_desc: "Board-certified neurologist specializing in stroke treatment and neurological disorders."
  },
  {
    doctor_id: 3,
    doctor_name: "Dr. Emily Rodriguez",
    doctor_dept: "Pediatrics",
    doctor_mail: "emily.rodriguez@hospital.com",
    doctor_desc: "Pediatric specialist with expertise in child development and pediatric emergency care."
  },
  {
    doctor_id: 4,
    doctor_name: "Dr. James Wilson",
    doctor_dept: "Orthopedics",
    doctor_mail: "james.wilson@hospital.com",
    doctor_desc: "Orthopedic surgeon specializing in joint replacement and sports medicine."
  },
  {
    doctor_id: 5,
    doctor_name: "Dr. Lisa Thompson",
    doctor_dept: "Dermatology",
    doctor_mail: "lisa.thompson@hospital.com",
    doctor_desc: "Dermatologist with focus on skin cancer prevention and cosmetic dermatology."
  }
]

export const patients = [
  {
    patientid: 1,
    patientName: "John Smith",
    patientAge: 45,
    patientEmail: "john.smith@email.com",
    patientGender: "Male"
  },
  {
    patientid: 2,
    patientName: "Mary Johnson",
    patientAge: 32,
    patientEmail: "mary.johnson@email.com",
    patientGender: "Female"
  },
  {
    patientid: 3,
    patientName: "Robert Brown",
    patientAge: 58,
    patientEmail: "robert.brown@email.com",
    patientGender: "Male"
  },
  {
    patientid: 4,
    patientName: "Jennifer Davis",
    patientAge: 28,
    patientEmail: "jennifer.davis@email.com",
    patientGender: "Female"
  },
  {
    patientid: 5,
    patientName: "David Wilson",
    patientAge: 41,
    patientEmail: "david.wilson@email.com",
    patientGender: "Male"
  }
]

export const appointments = [
  {
    appointment_id: 1,
    appointment_slot: "2024-01-15 09:00",
    patient_id: 1,
    doctor_id: 1,
    status: "Scheduled"
  },
  {
    appointment_id: 2,
    appointment_slot: "2024-01-15 10:30",
    patient_id: 2,
    doctor_id: 2,
    status: "Completed"
  },
  {
    appointment_id: 3,
    appointment_slot: "2024-01-16 14:00",
    patient_id: 3,
    doctor_id: 3,
    status: "Scheduled"
  },
  {
    appointment_id: 4,
    appointment_slot: "2024-01-16 11:15",
    patient_id: 4,
    doctor_id: 1,
    status: "Cancelled"
  },
  {
    appointment_id: 5,
    appointment_slot: "2024-01-17 15:30",
    patient_id: 5,
    doctor_id: 4,
    status: "Scheduled"
  }
]

export const reports = [
  {
    report_id: 1,
    report_date: "2024-01-10",
    report_details: "Monthly patient statistics and department performance review. Overall patient satisfaction increased by 15%.",
    report_status: "completed",
    admin_id: 1
  },
  {
    report_id: 2,
    report_date: "2024-01-12",
    report_details: "Equipment maintenance report for cardiology department. All equipment functioning properly.",
    report_status: "completed",
    admin_id: 1
  },
  {
    report_id: 3,
    report_date: "2024-01-14",
    report_details: "Staff training completion report for Q1 2024. 95% completion rate achieved.",
    report_status: "pending",
    admin_id: 1
  }
]

export const feedback = [
  {
    feedback_id: 1,
    feedback_desc: "Excellent service and very professional staff. Dr. Johnson was very thorough in explaining my condition.",
    feedback_rating: 5,
    patientid: 1
  },
  {
    feedback_id: 2,
    feedback_desc: "Good experience overall, but waiting time was a bit long. The treatment was effective.",
    feedback_rating: 4,
    patientid: 2
  },
  {
    feedback_id: 3,
    feedback_desc: "Outstanding care from Dr. Rodriguez. She was great with my child and made the visit comfortable.",
    feedback_rating: 5,
    patientid: 3
  },
  {
    feedback_id: 4,
    feedback_desc: "Average experience. The facility is clean but could use better organization in the waiting area.",
    feedback_rating: 3,
    patientid: 4
  },
  {
    feedback_id: 5,
    feedback_desc: "Very satisfied with the orthopedic consultation. Dr. Wilson provided clear treatment options.",
    feedback_rating: 5,
    patientid: 5
  }
]

// Prescriptions data
export const prescriptions = [
  {
    prescription_id: 1,
    patient_id: 1,
    doctor_id: 1,
    prescriptionDate: "2024-01-15",
    prescriptionDetails: "Take medication after meals, rest for 3 days. Avoid heavy physical activity.",
    prescriptionMedicine: "Paracetamol 500mg - 2 times daily, Amoxicillin 250mg - 3 times daily"
  },
  {
    prescription_id: 2,
    patient_id: 2,
    doctor_id: 2,
    prescriptionDate: "2024-01-12",
    prescriptionDetails: "Apply ointment twice daily, avoid direct sunlight. Use sunscreen when going out.",
    prescriptionMedicine: "Hydrocortisone cream 1%, Vitamin D supplements"
  },
  {
    prescription_id: 3,
    patient_id: 3,
    doctor_id: 3,
    prescriptionDate: "2024-01-10",
    prescriptionDetails: "Complete the full course of antibiotics. Take probiotics to maintain gut health.",
    prescriptionMedicine: "Azithromycin 500mg - Once daily, Probiotics - Twice daily"
  }
]