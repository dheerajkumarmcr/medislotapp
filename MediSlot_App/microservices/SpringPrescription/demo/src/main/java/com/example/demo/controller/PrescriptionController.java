// PrescriptionController.java
package com.example.demo.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
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

import com.example.demo.model.Prescription;
import com.example.demo.repository.PrescriptionRepository;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class PrescriptionController {

    @Autowired
    PrescriptionRepository prescriptionRepository;

    @PostMapping("/prescription")
    public ResponseEntity<Prescription> createPrescription(@RequestBody Prescription prescription){
        try {
            Prescription _prescription = prescriptionRepository.save(new Prescription( prescription.getPrescriptionDetails(), prescription.getPrescriptionMedicine(), prescription.getPrescriptionDate()));
            return new ResponseEntity<>(_prescription, HttpStatus.CREATED);
        }catch(Exception ex) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/prescriptions")
    public ResponseEntity<List<Prescription>> getAllReports(){
        try {

            List<Prescription> prescriptions = new ArrayList<Prescription>();

            prescriptionRepository.findAll().forEach(prescriptions::add);
            if(prescriptions.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(prescriptions, HttpStatus.OK);
        }catch(Exception ex) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @GetMapping("/prescription/{id}")
    public ResponseEntity<Prescription> getPrescriptionById(@PathVariable("id") long id){
        try {
            Optional<Prescription> prescriptionData = prescriptionRepository.findById(id);
            if(prescriptionData.isPresent()) {
                return new ResponseEntity<>(prescriptionData.get(), HttpStatus.OK);
            }else {
                return new ResponseEntity<>( HttpStatus.NOT_FOUND);
            }
        }catch(Exception ex) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/prescription/{id}")
    public ResponseEntity<Prescription> updatePrescription(@PathVariable("id") long id, @RequestBody Prescription prescription ){
        Optional<Prescription> prescriptionData =	prescriptionRepository.findById(id);
        if(prescriptionData.isPresent()) {
            Prescription _prescription =prescriptionData.get();
            _prescription.setPrescriptionDetails(prescription.getPrescriptionDetails());
            _prescription.setPrescriptionMedicine(prescription.getPrescriptionMedicine());
            _prescription.setPrescriptionDate(prescription.getPrescriptionDate());
            return new ResponseEntity<>(prescriptionRepository.save(_prescription), HttpStatus.OK);
        }else {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }

    }
    @DeleteMapping("/prescription/{id}")
    public ResponseEntity<HttpStatus> deleteReport(@PathVariable("id") long id){
        try {
            prescriptionRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }catch(Exception ex) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

   