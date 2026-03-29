package com.example.demo.repository;


import com.example.demo.model.Complaint;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ComplaintRepository extends JpaRepository<Complaint, Long> {
    
    // Custom query to find complaints by status (useful for your Admin Pie Chart)
    List<Complaint> findByStatus(String status);
    
    // Custom query to find complaints by email (useful for user tracking)
    List<Complaint> findByEmail(String email);
}
