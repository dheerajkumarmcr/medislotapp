package com.example.appointment.controller;

import com.example.appointment.model.Appointment;
import com.example.appointment.repository.AppointmentRepository;
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
public class AppointmentController {
    @Autowired
    AppointmentRepository appointmentRepository;

    @PostMapping("/appointment")
    public ResponseEntity<Appointment> createAppointment(@RequestBody Appointment appointment) {
        try {
            Appointment _appointment = appointmentRepository.save(new Appointment( appointment.getAppointment_doctor(), appointment.getAppointment_patient(), appointment.getAppointment_date(), appointment.getAppointment_time(), appointment.getAppointment_reason(), appointment.getAppointment_status()));
            return new ResponseEntity<>(_appointment, HttpStatus.CREATED);
        } catch (Exception ex) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/appointments")
    public ResponseEntity<List<Appointment>> getAllAppointments() {
        try {
            List<Appointment> appointments = new ArrayList<Appointment>();
            appointmentRepository.findAll().forEach(appointments::add);
            if(appointments.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(appointments, HttpStatus.OK);
        }catch(Exception ex) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/appointment/{appointment_id}")
    public ResponseEntity<Appointment> getAppointmentById(@PathVariable("appointment_id") Long appointment_id) {
        try {
            Optional<Appointment> appointmentData = appointmentRepository.findById(appointment_id);
            return appointmentData.map(appointment  -> new ResponseEntity<>(appointment, HttpStatus.OK))
                    .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
        } catch (Exception ex) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/appointment/{appointment_id}")
    public ResponseEntity<Appointment> updateAppointment(@PathVariable("appointment_id") Long appointment_id, @RequestBody Appointment appointment) {
        Optional<Appointment> appointmentData = appointmentRepository.findById(appointment_id);
        if (appointmentData.isPresent()) {
            Appointment _appointment = appointmentData.get();

            _appointment.setAppointment_doctor(appointment.getAppointment_doctor());
            _appointment.setAppointment_patient(appointment.getAppointment_patient());
            _appointment.setAppointment_date(appointment.getAppointment_date());
            _appointment.setAppointment_time(appointment.getAppointment_time());
            _appointment.setAppointment_reason(appointment.getAppointment_reason());
            _appointment.setAppointment_status(appointment.getAppointment_status());


            return new ResponseEntity<>(appointmentRepository.save(_appointment), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/appointment/{appointment_id}")
    public ResponseEntity<HttpStatus> deleteAppointment(@PathVariable("appointment_id") Long appointment_id) {
        try {
            appointmentRepository.deleteById(appointment_id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception ex) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}
