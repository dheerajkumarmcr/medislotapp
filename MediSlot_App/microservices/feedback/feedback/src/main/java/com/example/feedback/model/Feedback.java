package com.example.feedback.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;


@Entity
@Table(name="feedbacks")

public class Feedback {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long feedback_id;

    private String feedback_desc;
    private String feedback_rating;
    private String feedback_doctor;

    //default
    public Feedback() {
        super();
    }

    //getter and setter


    public long getFeedback_id() {
        return feedback_id;
    }

    public void setFeedback_id(long feedback_id) {
        this.feedback_id = feedback_id;
    }

    public String getFeedback_desc() {
        return feedback_desc;
    }

    public void setFeedback_desc(String feedback_desc) {
        this.feedback_desc = feedback_desc;
    }

    public String getFeedback_rating() {
        return feedback_rating;
    }

    public void setFeedback_rating(String feedback_rating) {
        this.feedback_rating = feedback_rating;
    }

    public String getFeedback_doctor() {
        return feedback_doctor;
    }

    public void setFeedback_doctor(String feedback_doctor) {
        this.feedback_doctor = feedback_doctor;
    }

    //Parameterized
    public Feedback( String feedback_desc, String feedback_rating, String feedback_doctor) {
        super();
        this.feedback_desc = feedback_desc;
        this.feedback_rating = feedback_rating;
        this.feedback_doctor = feedback_doctor;
    }

    //toString

    @Override
    public String toString() {
        return "Feedback [feedback_id=" + feedback_id + ", feedback_desc=" + feedback_desc + ", feedback_rating="
                + feedback_rating + ", feedback_doctor=" + feedback_doctor + "]";

    }





}
