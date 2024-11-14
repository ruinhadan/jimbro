package com.sixthOfDusk.jimbro.controllers;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

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

import com.sixthOfDusk.jimbro.models.Workout;
import com.sixthOfDusk.jimbro.repositories.WorkoutRepository;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class WorkoutController {
    private WorkoutRepository workoutRepository;

    public WorkoutController(WorkoutRepository workoutRepository) {
        this.workoutRepository = workoutRepository;
    }
    
    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/workouts")
    public ResponseEntity<List<Workout>> getAllWorkouts() {
        return ResponseEntity.ok(workoutRepository.findAll());
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/workouts/{id}")
    public ResponseEntity<Optional<Workout>> getWorkout(@PathVariable long id) {
        return ResponseEntity.ok(workoutRepository.findById(id));
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PutMapping("/workouts")
    public void updateWorkout(@RequestBody Workout workout) {
        workoutRepository.save(workout);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/workouts")
    public void createWorkout(@RequestBody Workout workout) {
        workoutRepository.save(workout);
    }
}
