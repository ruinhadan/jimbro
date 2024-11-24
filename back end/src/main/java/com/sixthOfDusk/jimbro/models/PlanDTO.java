package com.sixthOfDusk.jimbro.models;

import java.util.UUID;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;



public interface PlanDTO {

    long getId();
    String getName();


}
