package com.sixthOfDusk.jimbro.repositories;
import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.data.util.Pair;
import org.springframework.transaction.annotation.Transactional;

import com.sixthOfDusk.jimbro.models.ExerciseDTO;
import com.sixthOfDusk.jimbro.models.Workout;
import com.sixthOfDusk.jimbro.models.WorkoutDTO;
import com.sixthOfDusk.jimbro.models.Record;
import com.sixthOfDusk.jimbro.models.RecordDTO;

@Transactional
public interface WorkoutRepository extends ListCrudRepository<Workout, Long>{
     @Query(value="select id, name from workout, plan_workouts where workout.id = plan_workouts.workouts_id and plan_workouts.plan_id = ?1", nativeQuery = true)
    public List<WorkoutDTO> findAllWorkoutNames(long planId);

    @Query(value = "select e.id, e.name from exercise e, workout_exercises we where e.id = we.exercises_id and we.workout_id = ?1", nativeQuery = true)
    public List<ExerciseDTO> findAllExercisesForWorkout(long workoutId);

    @Modifying
    @Query(value = "insert into workout_exercises values (?1, ?2)", nativeQuery = true)
    public void addExerciseToWorkout(long exerciseId, long workoutId);

    @Query(value = "select reps, sets, unit, weight, date, id from record join workout_records on record.id = workout_records.records_id where record.exercise_id = ?2 and workout_records.workout_id = ?1 order by date desc", nativeQuery = true)
    public List<RecordDTO> findRecordsForExercise(long workoutId, long exerciseId);
}
