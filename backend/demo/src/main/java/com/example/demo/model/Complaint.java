package com.example.demo.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "complaints")
@Data // This Lombok annotation generates Getters, Setters, and ToString automatically
public class Complaint {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;
    private String phone;
    private String type; // e.g., Water Leak, Streetlight, etc.
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    private String zone;
    private String address;
    
    // Default status is 'Pending'
    private String status = "Pending";

    private LocalDateTime createdAt;

    // This runs automatically before saving to the database
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
