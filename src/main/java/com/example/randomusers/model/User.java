package com.example.randomusers.model;

import lombok.Data;
import java.time.LocalDate;

@Data
public class User {
    private String name;
    private String gender;
    private String location;
    private String email;
    private LocalDate dateOfBirth;
    private String picture;
} 