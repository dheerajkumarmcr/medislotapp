package com.example.doctor.model;

import jakarta.persistence.*;


@Entity
@Table(name="doctors")
public class Doctor {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long doctor_id;
    private String doctor_name;
    private String doctor_dept;
    private String doctor_mail;
    private String doctor_desc;
    private String doctor_password;

    //default constructor:
    public Doctor() {
        super();
    }

    public Doctor(String doctor_name, String doctor_dept, String doctor_mail, String doctor_desc, String doctor_password) {
        this.doctor_name = doctor_name;
        this.doctor_dept = doctor_dept;
        this.doctor_mail = doctor_mail;
        this.doctor_desc = doctor_desc;
        this.doctor_password = doctor_password;
    }

    public long getDoctor_id() {
        return doctor_id;
    }

    public void setDoctor_id(long doctor_id) {
        this.doctor_id = doctor_id;
    }

    public String getDoctor_name() {
        return doctor_name;
    }

    public void setDoctor_name(String doctor_name) {
        this.doctor_name = doctor_name;
    }

    public String getDoctor_dept() {
        return doctor_dept;
    }

    public void setDoctor_dept(String doctor_dept) {
        this.doctor_dept = doctor_dept;
    }

    public String getDoctor_mail() {
        return doctor_mail;
    }

    public void setDoctor_mail(String doctor_mail) {
        this.doctor_mail = doctor_mail;
    }

    public String getDoctor_desc() {
        return doctor_desc;
    }

    public void setDoctor_desc(String doctor_desc) {
        this.doctor_desc = doctor_desc;
    }

    public String getDoctor_password() {
        return doctor_password;
    }

    public void setDoctor_password(String doctor_password) {
        this.doctor_password = doctor_password;
    }

    @Override
    public String toString() {
        return "Doctor{" +
                "doctor_id=" + doctor_id +
                ", doctor_name='" + doctor_name + '\'' +
                ", doctor_dept='" + doctor_dept + '\'' +
                ", doctor_mail='" + doctor_mail + '\'' +
                ", doctor_desc='" + doctor_desc + '\'' +
                ", doctor_password='" + doctor_password + '\'' +
                '}';
    }
}
