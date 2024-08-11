package com.sixthOfDusk.jimbro.controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.sixthOfDusk.jimbro.models.Plan;
import com.sixthOfDusk.jimbro.repositories.PlanRepository;

@RestController
public class PlanController {

    private PlanRepository planRepository;

    public PlanController(PlanRepository planRepository) {
        this.planRepository = planRepository;
    }
    
    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/plans")
    public ResponseEntity<List<Plan>> getAllPlans() {
        return ResponseEntity.ok(planRepository.findAll());
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/plans/{id}")
    public ResponseEntity<Optional<Plan>> getPlan(@PathVariable UUID id) {
        return ResponseEntity.ok(planRepository.findById(id));
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PutMapping("/plans")
    public void updatePlan(@RequestBody Plan plan) {
        planRepository.save(plan);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/plans")
    public void createPlan(@RequestBody Plan plan) {
        planRepository.save(plan);
    }
}
