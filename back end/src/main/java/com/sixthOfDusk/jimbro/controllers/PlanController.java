package com.sixthOfDusk.jimbro.controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

import org.apache.catalina.connector.Response;
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
import org.springframework.web.service.annotation.PatchExchange;

import com.sixthOfDusk.jimbro.models.Exercise;
import com.sixthOfDusk.jimbro.models.ExerciseDTO;
import com.sixthOfDusk.jimbro.models.Plan;
import com.sixthOfDusk.jimbro.models.PlanDTO;
import com.sixthOfDusk.jimbro.models.Record;
import com.sixthOfDusk.jimbro.models.RecordDTO;
import com.sixthOfDusk.jimbro.models.Workout;
import com.sixthOfDusk.jimbro.models.WorkoutDTO;
import com.sixthOfDusk.jimbro.repositories.ExerciseRepository;
import com.sixthOfDusk.jimbro.repositories.PlanRepository;
import com.sixthOfDusk.jimbro.repositories.WorkoutRepository;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class PlanController {

    private PlanRepository planRepository;
    private WorkoutRepository workoutRepository;
    private ExerciseRepository exerciseRepository;

    public PlanController(PlanRepository planRepository, WorkoutRepository workoutRepository, ExerciseRepository exerciseRepository) {
        this.planRepository = planRepository;
        this.workoutRepository = workoutRepository;
        this.exerciseRepository = exerciseRepository;
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
        // System.out.println(plan);
        planRepository.save(plan);
    }
    
    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/plans/{planId}/workouts")
    public ResponseEntity<List<WorkoutDTO>> getAllWorkouts(@PathVariable long planId) {
        return ResponseEntity.ok(workoutRepository.findAllWorkoutNames(planId));
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/workouts/{workoutId}/exercises")
    public ResponseEntity<List<ExerciseDTO>> getExercisesForWorkout(@PathVariable long workoutId) {
        return ResponseEntity.ok(workoutRepository.findAllExercisesForWorkout(workoutId));
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PostMapping("/workouts/{workoutId}/exercises")
    public void addExerciseToWorkout(@PathVariable long workoutId, @RequestBody Exercise exercise) {
        workoutRepository.addExerciseToWorkout(workoutId, exercise.getId());
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/workouts/{workoutId}/exercises/{exerciseId}/records")
    public ResponseEntity<List<RecordDTO>> getRecordsForExercise(@PathVariable long workoutId, @PathVariable long exerciseId) {
        return ResponseEntity.ok(workoutRepository.findRecordsForExercise(workoutId, exerciseId));
    }
    
    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/exercises")
    public ResponseEntity<List<Exercise>> getALlExercises() {
        return ResponseEntity.ok(this.exerciseRepository.findAll());
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
        planRepository.addWorkoutToPlan(planId, workout.getId());
    }
}
