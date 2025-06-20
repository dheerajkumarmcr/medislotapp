package com.example.feedback.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import com.example.feedback.model.Feedback;
import com.example.feedback.repository.FeedbackRepository;



@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class FeedbackController {

    @Autowired
    FeedbackRepository feedbackRepository;

    //create:
    @PostMapping("/feedback")
    public ResponseEntity<Feedback> createFeedback(@RequestBody Feedback feedback){
        try {
            Feedback _feedback = feedbackRepository.save(new Feedback(feedback.getFeedback_desc(),feedback.getFeedback_rating(),feedback.getFeedback_doctor()));
            return new ResponseEntity<>(_feedback, HttpStatus.CREATED);
        }catch(Exception ex){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //Read:
    @GetMapping("/feedbacks")
    public ResponseEntity<List<Feedback>> getAllFeedbacks() {
        try {
            List<Feedback> feedbacks = new ArrayList<Feedback>();
            feedbackRepository.findAll().forEach(feedbacks::add);
            if(feedbacks.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(feedbacks,  HttpStatus.OK);
        }catch(Exception ex){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //Read by Id:
    @GetMapping("/feedback/{feedback_id}")
    public ResponseEntity<Feedback> getFeedbackById(@PathVariable("feedback_id") long feedback_id) {
        try {
            Optional<Feedback> feedbackData = feedbackRepository.findById(feedback_id);
            if(feedbackData.isPresent()) {
                return new ResponseEntity<>(feedbackData.get(),HttpStatus.OK);
            }else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        }catch(Exception ex){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //update:
    @PutMapping("/feedback/{feedback_id}")
    public ResponseEntity<Feedback> updateFeedback(@PathVariable("feedback_id") long feedback_id,@RequestBody Feedback feedback ){
        Optional<Feedback> feedbackData = feedbackRepository.findById(feedback_id);
        if(feedbackData.isPresent()) {
            Feedback _feedback = feedbackData.get();
            _feedback.setFeedback_desc(feedback.getFeedback_desc());
            _feedback.setFeedback_rating(feedback.getFeedback_rating());
            _feedback.setFeedback_doctor(feedback.getFeedback_doctor());

            return new ResponseEntity<>(feedbackRepository.save(_feedback), HttpStatus.OK);
        }else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    //delete:
    @DeleteMapping("/feedback/{feedback_id}")
    public ResponseEntity<Feedback> deleteFeedback(@PathVariable("feedback_id") long feedback_id){
        try {
            feedbackRepository.deleteById(feedback_id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }catch(Exception ex){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}


