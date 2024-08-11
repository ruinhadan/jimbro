package com.sixthOfDusk.jimbro.repositories;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.repository.ListCrudRepository;

import com.sixthOfDusk.jimbro.models.Plan;

public interface PlanRepository extends ListCrudRepository<Plan, UUID> {
}