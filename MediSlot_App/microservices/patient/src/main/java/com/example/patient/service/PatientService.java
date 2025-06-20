package com.example.patient.service;

import com.example.patient.model.Patient;
import com.example.patient.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PatientService {
    @Autowired
    private PatientRepository patientRepository;

    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }

    public Patient getPatientById(long patient_id) {
        return patientRepository.findById(patient_id).orElse(null);
    }

    public Patient addPatient(Patient patient) {
        return patientRepository.save(patient);
    }

    public Patient updatePatient(Long patient_id,Patient patient) {
        Patient existing = patientRepository.findById(patient_id)
                .orElseThrow(() -> new RuntimeException("Report not found"));
        existing.setPatient_name(patient.getPatient_name());

        existing.setPatient_mail(patient.getPatient_mail());

        existing.setPatient_password(patient.getPatient_password());
        return patientRepository.save(patient);
    }

    public void deletePatient(long patient_id) {
        patientRepository.deleteById(patient_id);
    }


}
