package com.sixthOfDusk.jimbro.repositories;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.ListCrudRepository;

import com.sixthOfDusk.jimbro.models.Record;

import jakarta.transaction.Transactional;

@Transactional
public interface RecordRepository extends ListCrudRepository<Record, Long>{
    @Modifying
    @Query(value = "delete from workout_records where records_id IN ?1", nativeQuery=true)
    public void deleteRecordFKs(List<Long> recordIds);

    @Modifying
    @Query(value = "delete from workout_records where records_id = ?1", nativeQuery=true)
    public void deleteRecordFKs(long recordId);
}
