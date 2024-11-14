package com.sixthOfDusk.jimbro.repositories;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.data.util.Pair;

import com.sixthOfDusk.jimbro.models.Plan;
import com.sixthOfDusk.jimbro.models.PlanDTO;

public interface PlanRepository extends ListCrudRepository<Plan, Long> {
    @Query(value="select id, name from plan", nativeQuery = true)
    public List<PlanDTO> findAllPlanNames();
}