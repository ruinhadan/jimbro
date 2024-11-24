package com.sixthOfDusk.jimbro.repositories;
import java.util.UUID;

import org.springframework.data.repository.ListCrudRepository;

import com.sixthOfDusk.jimbro.models.Exercise;

public interface ExerciseRepository extends ListCrudRepository<Exercise, Long>{
}
