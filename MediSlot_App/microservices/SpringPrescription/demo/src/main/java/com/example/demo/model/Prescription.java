package com.example.demo.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "prescriptions")
public class Prescription {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String prescriptionDetails;
    private String prescriptionMedicine;
    private String prescriptionDate;

    // Constructors
    public Prescription() {
    }

    public Prescription(String prescriptionDetails, String prescriptionMedicine, String prescriptionDate) {
        this.prescriptionDetails = prescriptionDetails;
        this.prescriptionMedicine = prescriptionMedicine;
        this.prescriptionDate = prescriptionDate;
    }
    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPrescriptionDetails() {
        return prescriptionDetails;
    }

    public void setPrescriptionDetails(String prescriptionDetails) {
        this.prescriptionDetails = prescriptionDetails;
    }

    public String getPrescriptionMedicine() {
        return prescriptionMedicine;
    }

    public void setPrescriptionMedicine(String prescriptionMedicine) {
        this.prescriptionMedicine = prescriptionMedicine;
    }

    public String getPrescriptionDate() {
        return prescriptionDate;
    }

    public void setPrescriptionDate(String prescriptionDate) {
        this.prescriptionDate = prescriptionDate;
    }

    @Override
    public String toString() {
        return "Prescription [id=" + id + ", prescriptionDetails=" + prescriptionDetails + ", prescriptionMedicine="
                + prescriptionMedicine + ", prescriptionDate=" + prescriptionDate + "]";
    }



}
