package com.sixthOfDusk.jimbro.models;

import java.util.Date;
import java.util.UUID;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.Data;
import lombok.NoArgsConstructor;

enum Unit {
    KG,
    LBS
}

@Data
@Entity
@NoArgsConstructor
public class Record {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    private Date date = new Date();
    @ManyToOne
    private Exercise exercise;
    private float weight;
    private Unit unit = Unit.KG;
    private int sets;
    private int reps;
}
