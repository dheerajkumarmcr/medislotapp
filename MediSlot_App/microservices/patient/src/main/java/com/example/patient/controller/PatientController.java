package com.example.patient.controller;

import com.example.patient.model.Patient;
import com.example.patient.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class PatientController {


    @Autowired
    PatientRepository patientRepository;


    // CREATE
    @PostMapping("/patient")
    public ResponseEntity<Patient> createPatient(@RequestBody Patient patient) {
        try {
            Patient _patient = patientRepository.save(new Patient(patient.getPatient_name(), patient.getPatient_mail(), patient.getPatient_password()));
            return new ResponseEntity<>(_patient, HttpStatus.CREATED);
        } catch (Exception ex) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/patients")
    public ResponseEntity<List<Patient>> getAllPatients(){
        try {

            List<Patient> patients = new ArrayList<Patient>();

            patientRepository.findAll().forEach(patients::add);
            if(patients.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(patients, HttpStatus.OK);
        }catch(Exception ex) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @GetMapping("/patient/{patient_id}")
    public ResponseEntity<Patient> getUserById(@PathVariable("patient_id") long patient_id){
        try {
            Optional<Patient> patientData = patientRepository.findById(patient_id);
            if(patientData.isPresent()) {
                return new ResponseEntity<>(patientData.get(), HttpStatus.OK);
            }else {
                return new ResponseEntity<>( HttpStatus.NOT_FOUND);
            }
        }catch(Exception ex) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/patient/{patient_id}")
    public ResponseEntity<Patient> updatePatient(@PathVariable("patient_id") long patient_id, @RequestBody Patient patient ){
        Optional<Patient> patientData =	patientRepository.findById(patient_id);
        if(patientData.isPresent()) {
            Patient _patient = patientData.get();
            _patient.setPatient_mail(patient.getPatient_mail());
            _patient.setPatient_name(patient.getPatient_name());

            _patient.setPatient_password(patient.getPatient_password());

            return new ResponseEntity<>(patientRepository.save(_patient), HttpStatus.OK);
        }else {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }

    }
    @DeleteMapping("/patient/{patient_id}")
    public ResponseEntity<HttpStatus> deletePatient(@PathVariable("patient_id") long patient_id){
        try {
            patientRepository.deleteById(patient_id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }catch(Exception ex) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
