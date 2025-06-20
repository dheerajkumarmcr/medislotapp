// PrescriptionService.java
package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.Prescription;
import com.example.demo.repository.PrescriptionRepository;

@Service
public class PrescriptionService {

    @Autowired
    private PrescriptionRepository prescriptionRepository;


    public List<Prescription> getAllReports() {
        return prescriptionRepository.findAll();
    }


    public Prescription createReport(Prescription prescription) {
        return prescriptionRepository.save(prescription);
    }

    public Prescription updateReport(Long id, Prescription prescription) {
        Prescription existing = prescriptionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Report not found"));
        existing.setPrescriptionDetails(prescription.getPrescriptionDetails());
        existing.setPrescriptionMedicine(prescription.getPrescriptionMedicine());
        existing.setPrescriptionDate(prescription.getPrescriptionDate());
        return prescriptionRepository.save(existing);
    }

    public void deleteReport(Long id) {
        prescriptionRepository.deleteById(id);
    }

}
