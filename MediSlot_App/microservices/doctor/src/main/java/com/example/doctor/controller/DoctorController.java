package com.example.doctor.controller;

import java.net.http.HttpResponse;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.doctor.model.Doctor;
import com.example.doctor.repository.DoctorRepository;


@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class DoctorController {

    @Autowired
    DoctorRepository doctorRepository;

    //create:
    @PostMapping("/doctor")
    public ResponseEntity<Doctor> createDoctor(@RequestBody Doctor doctor){
        try {
            Doctor _doctor = doctorRepository.save(new Doctor(doctor.getDoctor_name(), doctor.getDoctor_dept(), doctor.getDoctor_mail(), doctor.getDoctor_desc(), doctor.getDoctor_password()));
            return new ResponseEntity<>(_doctor, HttpStatus.CREATED);
        }catch(Exception ex){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //Read:
    @GetMapping("/doctors")
    public ResponseEntity<List<Doctor>> getAllDoctors() {
        try {
            List<Doctor> doctors = new ArrayList<Doctor>();
            doctorRepository.findAll().forEach(doctors::add);
            if(doctors.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(doctors,  HttpStatus.OK);
        }catch(Exception ex){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //Read by Id:
    @GetMapping("/doctor/{doctor_id}")
    public ResponseEntity<Doctor> getDoctorById(@PathVariable("doctor_id") long doctor_id) {
        try {
            Optional<Doctor> doctorData = doctorRepository.findById(doctor_id);
            if(doctorData.isPresent()) {
                return new ResponseEntity<>(doctorData.get(),HttpStatus.OK);
            }else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        }catch(Exception ex){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //update:
    @PutMapping("/doctor/{doctor_id}")
    public ResponseEntity<Doctor> updateDoctor(@PathVariable("doctor_id") long doctor_id,@RequestBody Doctor doctor ){
        Optional<Doctor> doctorData = doctorRepository.findById(doctor_id);
        if(doctorData.isPresent()) {
            Doctor _doctor = doctorData.get();
            _doctor.setDoctor_name(doctor.getDoctor_name());
            _doctor.setDoctor_dept(doctor.getDoctor_dept());
            _doctor.setDoctor_mail(doctor.getDoctor_mail());
            _doctor.setDoctor_desc(doctor.getDoctor_desc());
            _doctor.setDoctor_password(doctor.getDoctor_password());
            return new ResponseEntity<>(doctorRepository.save(_doctor), HttpStatus.OK);
        }else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    //delete:
    @DeleteMapping("/doctor/{doctor_id}")
    public ResponseEntity<Doctor> deleteDoctor(@PathVariable("doctor_id") long doctor_id){
        try {
            doctorRepository.deleteById(doctor_id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }catch(Exception ex){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
