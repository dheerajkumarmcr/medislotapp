package com.example.feedback.service;

import java.util.List;



import com.example.feedback.model.Feedback;
import com.example.feedback.repository.FeedbackRepository;
import org.springframework.beans.factory.annotation.Autowired;

public class FeedbackService {
    @Autowired
    private FeedbackRepository feedbackRepository;

    public List<Feedback> getAllfeedbacks() {
        return feedbackRepository.findAll();
    }

    public Feedback createFeedback(Feedback feedback) {
        return feedbackRepository.save(feedback);
    }

    public Feedback updateFeedback(Long feedback_id, Feedback feedback) {
        Feedback existing = feedbackRepository.findById(feedback_id)
                .orElseThrow(() -> new RuntimeException("Feedback not found"));
        existing.setFeedback_desc(feedback.getFeedback_desc());
        existing.setFeedback_rating(feedback.getFeedback_rating());
        existing.setFeedback_doctor(feedback.getFeedback_doctor());

        return feedbackRepository.save(existing);
    }

    public void deleteFeedback(Long feedback_id) {
        feedbackRepository.deleteById(feedback_id);
    }
}
