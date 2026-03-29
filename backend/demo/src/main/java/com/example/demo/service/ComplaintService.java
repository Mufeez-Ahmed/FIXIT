package com.example.demo.service;

import com.example.demo.model.Complaint;
import com.example.demo.repository.ComplaintRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ComplaintService {

    @Autowired
    private ComplaintRepository complaintRepository;

    public Complaint saveComplaint(Complaint complaint) {
        return complaintRepository.save(complaint);
    }

    public List<Complaint> getAllComplaints() {
        return complaintRepository.findAll();
    }

    public Optional<Complaint> getComplaintById(Long id) {
        return complaintRepository.findById(id);
    }

    // NEW: Logic to find the complaint, change the status, and save it back to MySQL
    public boolean updateComplaintStatus(Long id, String newStatus) {
        return complaintRepository.findById(id).map(complaint -> {
            complaint.setStatus(newStatus);
            complaintRepository.save(complaint);
            return true;
        }).orElse(false);
    }
}