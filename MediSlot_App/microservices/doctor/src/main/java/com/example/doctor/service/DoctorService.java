package com.example.doctor.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.doctor.model.Doctor;
import com.example.doctor.repository.DoctorRepository;

import java.util.List;

@Service
public class DoctorService {

    @Autowired
    private DoctorRepository doctorRepository;

    public List<Doctor> getAlldoctors() {
        return doctorRepository.findAll();
    }

    public Doctor createDoctor(Doctor doctor) {
        return doctorRepository.save(doctor);
    }

    public Doctor updateUser(Long doctor_id, Doctor doctor) {
        Doctor existing = doctorRepository.findById(doctor_id)
                .orElseThrow(() -> new RuntimeException("Doctor not found"));
        existing.setDoctor_name(doctor.getDoctor_name());
        existing.setDoctor_dept(doctor.getDoctor_dept());
        existing.setDoctor_mail(doctor.getDoctor_mail());
        existing.setDoctor_desc(doctor.getDoctor_desc());
        existing.setDoctor_password(doctor.getDoctor_password());
        return doctorRepository.save(existing);
    }

    public void deleteDoctor(Long doctor_id) {
        doctorRepository.deleteById(doctor_id);
    }
}

