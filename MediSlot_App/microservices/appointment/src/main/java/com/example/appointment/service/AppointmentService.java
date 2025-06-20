package com.example.appointment.service;

import com.example.appointment.model.Appointment;
import com.example.appointment.repository.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AppointmentService {
    @Autowired
    private AppointmentRepository appointmentRepository;


    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }


    public Appointment createAppointment(Appointment appointment) {
        return appointmentRepository.save(appointment);
    }

    public Appointment updateAppointment(Long appointment_Id, Appointment appointment) {
        Appointment existing = appointmentRepository.findById(appointment_Id)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));
        existing.setAppointment_id(appointment.getAppointment_id());
        existing.setAppointment_doctor(appointment.getAppointment_doctor());
        existing.setAppointment_patient(appointment.getAppointment_patient());
        existing.setAppointment_date(appointment.getAppointment_date());
        existing.setAppointment_time(appointment.getAppointment_time());
        existing.setAppointment_reason(appointment.getAppointment_reason());
        existing.setAppointment_status(appointment.getAppointment_status());

        return appointmentRepository.save(existing);
    }

    public void deleteAppointment(Long appointment_Id) {
        appointmentRepository.deleteById(appointment_Id);
    }
}
