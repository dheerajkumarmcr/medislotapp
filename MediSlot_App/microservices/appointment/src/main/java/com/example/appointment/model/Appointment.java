package com.example.appointment.model;

import jakarta.persistence.*;

@Entity
@Table(name="appointments")
public class Appointment {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long appointment_id;
    private String appointment_doctor;
    private String appointment_patient;
    private String appointment_date;
    private String appointment_time;
    private String appointment_reason;
    private String appointment_status;

    public Appointment() {
    }

    public Appointment(String appointment_doctor, String appointment_patient, String appointment_date, String appointment_time, String appointment_reason, String appointment_status) {
        this.appointment_doctor = appointment_doctor;
        this.appointment_patient = appointment_patient;
        this.appointment_date = appointment_date;
        this.appointment_time = appointment_time;
        this.appointment_reason = appointment_reason;
        this.appointment_status = appointment_status;
    }

    public long getAppointment_id() {
        return appointment_id;
    }

    public void setAppointment_id(long appointment_id) {
        this.appointment_id = appointment_id;
    }

    public String getAppointment_doctor() {
        return appointment_doctor;
    }

    public void setAppointment_doctor(String appointment_doctor) {
        this.appointment_doctor = appointment_doctor;
    }

    public String getAppointment_patient() {
        return appointment_patient;
    }

    public void setAppointment_patient(String appointment_patient) {
        this.appointment_patient = appointment_patient;
    }

    public String getAppointment_date() {
        return appointment_date;
    }

    public void setAppointment_date(String appointment_date) {
        this.appointment_date = appointment_date;
    }

    public String getAppointment_time() {
        return appointment_time;
    }

    public void setAppointment_time(String appointment_time) {
        this.appointment_time = appointment_time;
    }

    public String getAppointment_reason() {
        return appointment_reason;
    }

    public void setAppointment_reason(String appointment_reason) {
        this.appointment_reason = appointment_reason;
    }

    public String getAppointment_status() {
        return appointment_status;
    }

    public void setAppointment_status(String appointment_status) {
        this.appointment_status = appointment_status;
    }

    @Override
    public String toString() {
        return "Appointment{" +
                "appointment_id=" + appointment_id +
                ", appointment_doctor='" + appointment_doctor + '\'' +
                ", appointment_patient='" + appointment_patient + '\'' +
                ", appointment_date='" + appointment_date + '\'' +
                ", appointment_time='" + appointment_time + '\'' +
                ", appointment_reason='" + appointment_reason + '\'' +
                ", appointment_status='" + appointment_status + '\'' +
                '}';
    }
}
