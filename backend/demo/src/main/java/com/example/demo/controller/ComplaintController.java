package com.example.demo.controller;

import com.example.demo.model.Complaint;
import com.example.demo.service.ComplaintService;
import com.example.demo.service.RecaptchaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/complaints")
@CrossOrigin(origins = "*") // Allows React to talk to Spring Boot
public class ComplaintController {

    @Autowired
    private ComplaintService complaintService;

    @Autowired
    private RecaptchaService recaptchaService;

    @PostMapping("/submit")
    public ResponseEntity<?> submitComplaint(
            @RequestBody Complaint complaint, 
            @RequestHeader("captcha-token") String captchaToken) {
        if (!recaptchaService.verify(captchaToken)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid reCAPTCHA.");
        }
        return ResponseEntity.ok(complaintService.saveComplaint(complaint));
    }

    // NEW: The method that handles the Approve/Reject button clicks
    @PutMapping("/update-status/{id}")
    public ResponseEntity<?> updateStatus(@PathVariable Long id, @RequestBody Map<String, String> statusUpdate) {
        String newStatus = statusUpdate.get("status");
        boolean isUpdated = complaintService.updateComplaintStatus(id, newStatus);
        
        if (isUpdated) {
            return ResponseEntity.ok().body("Status updated successfully");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Complaint ID not found");
        }
    }

    @GetMapping("/all")
    public List<Complaint> getAll() {
        return complaintService.getAllComplaints();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Complaint> getComplaint(@PathVariable Long id) {
        return complaintService.getComplaintById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}