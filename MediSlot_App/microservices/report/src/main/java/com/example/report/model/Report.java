package com.example.report.model;


import jakarta.persistence.*;

@Entity
@Table(name="reports")
public class Report {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long report_id;
    private String report_date;
    private String report_details;
    private String report_status;

    public Report() {
    }

    public Report(String report_date, String report_details, String report_status) {
        this.report_date = report_date;
        this.report_details = report_details;
        this.report_status = report_status;
    }

    public long getReport_id() {
        return report_id;
    }

    public void setReport_id(long report_id) {
        this.report_id = report_id;
    }

    public String getReport_date() {
        return report_date;
    }

    public void setReport_date(String report_date) {
        this.report_date = report_date;
    }

    public String getReport_details() {
        return report_details;
    }

    public void setReport_details(String report_details) {
        this.report_details = report_details;
    }

    public String getReport_status() {
        return report_status;
    }

    public void setReport_status(String report_status) {
        this.report_status = report_status;
    }

    @Override
    public String toString() {
        return "Report{" +
                "report_id=" + report_id +
                ", report_date='" + report_date + '\'' +
                ", report_details='" + report_details + '\'' +
                ", report_status='" + report_status + '\'' +
                '}';
    }
}
