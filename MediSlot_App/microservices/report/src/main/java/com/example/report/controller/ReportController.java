package com.example.report.controller;


import com.example.report.model.Report;
import com.example.report.repository.ReportRepository;
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
public class ReportController {

    @Autowired
    ReportRepository reportRepository;

    @PostMapping("/report")
    public ResponseEntity<Report> createUser(@RequestBody Report report){
        try {
            Report _report = reportRepository.save(new Report(report.getReport_date(), report.getReport_details(), report.getReport_status()));
            return new ResponseEntity<>(_report, HttpStatus.CREATED);
        }catch(Exception ex) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/reports")
    public ResponseEntity<List<Report>> getAllReports(){
        try {

            List<Report> reports = new ArrayList<Report>();

            reportRepository.findAll().forEach(reports::add);
            if(reports.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(reports, HttpStatus.OK);
        }catch(Exception ex) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @GetMapping("/report/{report_id}")
    public ResponseEntity<Report> getUserById(@PathVariable("report_id") long report_Id){
        try {
            Optional<Report> reportData = reportRepository.findById(report_Id);
            if(reportData.isPresent()) {
                return new ResponseEntity<>(reportData.get(), HttpStatus.OK);
            }else {
                return new ResponseEntity<>( HttpStatus.NOT_FOUND);
            }
        }catch(Exception ex) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/report/{report_id}")
    public ResponseEntity<Report> updateReport(@PathVariable("report_id") long report_Id, @RequestBody Report report ){
        Optional<Report> reportData =	reportRepository.findById(report_Id);
        if(reportData.isPresent()) {
            Report _report = reportData.get();
            _report.setReport_date(report.getReport_date());
            _report.setReport_details(report.getReport_details());
            _report.setReport_status(report.getReport_status());
            return new ResponseEntity<>(reportRepository.save(_report), HttpStatus.OK);
        }else {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }

    }
    @DeleteMapping("/report/{report_id}")
    public ResponseEntity<HttpStatus> deleteReport(@PathVariable("report_id") long report_Id){
        try {
            reportRepository.deleteById(report_Id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }catch(Exception ex) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}
