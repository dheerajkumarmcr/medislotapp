package com.example.report.service;

import com.example.report.model.Report;
import com.example.report.repository.ReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReportService {
    @Autowired
    private ReportRepository reportRepository;


    public List<Report> getAllReports() {
        return reportRepository.findAll();
    }


    public Report createReport(Report report) {
        return reportRepository.save(report);
    }

    public Report updateReport(Long report_id, Report report) {
        Report existing = reportRepository.findById(report_id)
                .orElseThrow(() -> new RuntimeException("Report not found"));
        existing.setReport_date(report.getReport_date());
        existing.setReport_details(report.getReport_details());
        existing.setReport_status(report.getReport_status());
        return reportRepository.save(existing);
    }

    public void deleteReport(Long report_id) {
        reportRepository.deleteById(report_id);
    }



}
