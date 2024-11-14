package com.sixthOfDusk.jimbro.controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.util.Pair;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.sixthOfDusk.jimbro.models.Plan;
import com.sixthOfDusk.jimbro.models.PlanDTO;
import com.sixthOfDusk.jimbro.models.Workout;
import com.sixthOfDusk.jimbro.models.WorkoutDTO;
import com.sixthOfDusk.jimbro.repositories.PlanRepository;
import com.sixthOfDusk.jimbro.repositories.WorkoutRepository;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class PlanController {

    private PlanRepository planRepository;
    private WorkoutRepository workoutRepository;

    public PlanController(PlanRepository planRepository, WorkoutRepository workoutRepository) {
        this.planRepository = planRepository;
        this.workoutRepository = workoutRepository;
    }
    
    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/plans")
    public ResponseEntity<List<PlanDTO>> getAllPlans() {
        return ResponseEntity.ok(planRepository.findAllPlanNames());
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/plans/{id}")
    public ResponseEntity<Optional<Plan>> getPlan(@PathVariable long id) {
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
    
    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/plans/{planId}/workouts")
    public ResponseEntity<List<WorkoutDTO>> getAllWorkouts(@PathVariable long planId) {
        return ResponseEntity.ok(workoutRepository.findAllWorkoutNames(planId));
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/plans/{planId}/workouts/{workoutId}")
    public ResponseEntity<Optional<Workout>> getWorkout(@PathVariable long planId, @PathVariable long workoutId) {
        return ResponseEntity.ok(workoutRepository.findById(workoutId));
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PutMapping("/plans/{planId}/workouts")
    public void updateWorkout(@PathVariable long planId, @RequestBody Workout workout) {
        workoutRepository.save(workout);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/plans/{planId}/workouts")
    public void createWorkout(@PathVariable long planId, @RequestBody Workout workout) {
        workoutRepository.save(workout);
    }
}
