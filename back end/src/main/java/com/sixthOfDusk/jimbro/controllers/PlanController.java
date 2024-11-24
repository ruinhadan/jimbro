package com.sixthOfDusk.jimbro.controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import org.apache.catalina.connector.Response;
import org.springframework.data.util.Pair;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMethod;
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
import com.sixthOfDusk.jimbro.repositories.RecordRepository;
import com.sixthOfDusk.jimbro.repositories.WorkoutRepository;

import jakarta.transaction.Transactional;

@RestController
@CrossOrigin(origins = "http://localhost:4200", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE, RequestMethod.OPTIONS, RequestMethod.PUT})
public class PlanController {

    private PlanRepository planRepository;
    private WorkoutRepository workoutRepository;
    private ExerciseRepository exerciseRepository;
    private RecordRepository recordRepository;

    public PlanController(PlanRepository planRepository, WorkoutRepository workoutRepository, ExerciseRepository exerciseRepository, RecordRepository recordRepository) {
        this.planRepository = planRepository;
        this.workoutRepository = workoutRepository;
        this.exerciseRepository = exerciseRepository;
        this.recordRepository = recordRepository;
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

    //TERRIBLE DELETE CODE - NEED TO REWRITE FOR UNIFORMITY

    @ResponseStatus(HttpStatus.OK)
    @DeleteMapping("/plans/{id}")
    @Transactional(rollbackOn = {Exception.class})
    public void deletePlan(@PathVariable long id) {
        List<WorkoutDTO> workouts = workoutRepository.findAllWorkoutNames(id);
        List<Long> workoutIds = workouts.stream().map(WorkoutDTO::getId).collect(Collectors.toList());
        List<Long> recordIds =workoutRepository.findAllRecordIdsForWorkout(workoutIds);
        recordRepository.deleteRecordFKs(recordIds);
        workoutRepository.deleteWorkoutFKs(workoutIds);
        planRepository.deletePlanFKs(id);
        recordRepository.deleteAllById(recordIds);
        workoutRepository.deleteAllById(workoutIds);
        planRepository.deleteById(id);
    }

    @ResponseStatus(HttpStatus.OK)
    @DeleteMapping("/plans/{planId}/workouts/{workoutId}")
    @Transactional(rollbackOn = {Exception.class})
    public void deleteWorkout(@PathVariable long planId, @PathVariable long workoutId) {
        List<Long> workoutIds = new ArrayList<Long>();
        workoutIds.add(workoutId);
        List<Long> recordIds =workoutRepository.findAllRecordIdsForWorkout(workoutIds);
        recordRepository.deleteRecordFKs(recordIds);
        workoutRepository.deleteWorkoutFKs(workoutIds);
        planRepository.deleteWorkoutFKs(workoutId);
        recordRepository.deleteAllById(recordIds);
        workoutRepository.deleteById(workoutId);
    }

    @ResponseStatus(HttpStatus.OK)
    @DeleteMapping("/workouts/{workoutId}/exercises/{exerciseId}")
    @Transactional(rollbackOn = {Exception.class})
    public void deleteExerciseFromWorkout(@PathVariable long workoutId, @PathVariable long exerciseId) {
        List<Long> workoutIds = new ArrayList<Long>();
        workoutIds.add(workoutId);
        List<Long> recordIds =workoutRepository.findRecordIdsForExercise(workoutId, exerciseId);
        recordRepository.deleteRecordFKs(recordIds);
        workoutRepository.deleteExerciseFKs(workoutId, exerciseId);
        recordRepository.deleteAllById(recordIds);
    }

    @ResponseStatus(HttpStatus.OK)
    @DeleteMapping("/workouts/{workoutId}/exercises/{exerciseId}/records/{recordId}")
    @Transactional(rollbackOn = {Exception.class})
    public void deleteRecord(@PathVariable long workoutId, @PathVariable long exerciseId, @PathVariable long recordId) {
        recordRepository.deleteRecordFKs(recordId);
        recordRepository.deleteById(recordId);
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
        System.out.println(workoutId);
        System.out.println(exerciseId);
        return ResponseEntity.ok(workoutRepository.findRecordsForExercise(workoutId, exerciseId));
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PostMapping("/workouts/{workoutId}/exercises/{exerciseId}/records")
    public void addRecordToWorkout(@PathVariable long workoutId, @PathVariable long exerciseId, @RequestBody Record record) {
        recordRepository.save(record);
        workoutRepository.addRecordToWorkout(record.getId(), workoutId);
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PutMapping("/workouts/{workoutId}/exercises/{exerciseId}/records/{recordId}")
    public void updateRecord(@PathVariable long workoutId, @PathVariable long exerciseId, @PathVariable long recordId, @RequestBody Record record) {
        recordRepository.save(record);
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
