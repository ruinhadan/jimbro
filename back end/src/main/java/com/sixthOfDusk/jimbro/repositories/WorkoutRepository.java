package com.sixthOfDusk.jimbro.repositories;
import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.data.util.Pair;

import com.sixthOfDusk.jimbro.models.Workout;
import com.sixthOfDusk.jimbro.models.WorkoutDTO;

public interface WorkoutRepository extends ListCrudRepository<Workout, Long>{
     @Query(value="select id, name from workout, plan_workouts where workout.id = plan_workouts.workouts_id and plan_workouts.plan_id = ?1", nativeQuery = true)
    public List<WorkoutDTO> findAllWorkoutNames(long planId);
}
