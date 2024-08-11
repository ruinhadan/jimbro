package com.sixthOfDusk.jimbro.models;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
public class Workout {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String name;

     
    private int exerciseCount = 0; 

    
    @OneToMany
    private List<Record> records = new ArrayList<Record>();

    
    @OneToMany
    private List<Exercise> exercises = new ArrayList<Exercise>();
}
