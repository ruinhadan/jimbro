package com.sixthOfDusk.jimbro.repositories;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.data.util.Pair;
import org.springframework.transaction.annotation.Transactional;

import com.sixthOfDusk.jimbro.models.Plan;
import com.sixthOfDusk.jimbro.models.PlanDTO;
import com.sixthOfDusk.jimbro.models.Workout;

@Transactional
public interface PlanRepository extends ListCrudRepository<Plan, Long> {
    @Query(value="select id, name from plan", nativeQuery = true)
    public List<PlanDTO> findAllPlanNames();

    @Modifying
    @Query(value="insert into plan_workouts values (?1, ?2)", nativeQuery = true)
    public void addWorkoutToPlan(long planId, long workoutId);
}