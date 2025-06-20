package com.example.doctor.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.doctor.model.Doctor;

public interface DoctorRepository extends JpaRepository<Doctor, Long> {

}
