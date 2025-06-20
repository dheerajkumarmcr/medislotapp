package com.example.patient.model;


import jakarta.persistence.*;

@Entity
@Table(name="patiets")
public class Patient {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long patient_id;

    private String patient_name;

    private String patient_mail;

    private String patient_password;

    public Patient() {
    }

    public Patient(String patient_name, String patient_mail, String patient_password) {
        this.patient_name = patient_name;
        this.patient_mail = patient_mail;
        this.patient_password = patient_password;
    }

    public Long getPatient_id() {
        return patient_id;
    }

    public void setPatient_id(Long patient_id) {
        this.patient_id = patient_id;
    }

    public String getPatient_name() {
        return patient_name;
    }

    public void setPatient_name(String patient_name) {
        this.patient_name = patient_name;
    }

    public String getPatient_mail() {
        return patient_mail;
    }

    public void setPatient_mail(String patient_mail) {
        this.patient_mail = patient_mail;
    }

    public String getPatient_password() {
        return patient_password;
    }

    public void setPatient_password(String patient_password) {
        this.patient_password = patient_password;
    }

    @Override
    public String toString() {
        return "Patient{" +
                "patient_id=" + patient_id +
                ", patient_name='" + patient_name + '\'' +
                ", patient_mail='" + patient_mail + '\'' +
                ", patient_password='" + patient_password + '\'' +
                '}';
    }
}
