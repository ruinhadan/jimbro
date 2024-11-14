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

import com.sixthOfDusk.jimbro.models.Record;
import com.sixthOfDusk.jimbro.repositories.RecordRepository;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class RecordController {
    private RecordRepository recordRepository;

    public RecordController(RecordRepository recordRepository) {
        this.recordRepository = recordRepository;
    }
    
    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/records")
    public ResponseEntity<List<Record>> getAllRecords() {
        return ResponseEntity.ok(recordRepository.findAll());
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/records/{id}")
    public ResponseEntity<Optional<Record>> getRecord(@PathVariable UUID id) {
        return ResponseEntity.ok(recordRepository.findById(id));
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PutMapping("/records")
    public void updateRecord(@RequestBody Record record) {
        recordRepository.save(record);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/records")
    public void createRecord(@RequestBody Record record) {
        recordRepository.save(record);
    }
}
