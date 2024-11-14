package com.sixthOfDusk.jimbro.repositories;

import java.util.UUID;

import org.springframework.data.repository.ListCrudRepository;

import com.sixthOfDusk.jimbro.models.Record;

public interface RecordRepository extends ListCrudRepository<Record, UUID>{
    
}
