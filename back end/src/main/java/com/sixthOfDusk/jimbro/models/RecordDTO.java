package com.sixthOfDusk.jimbro.models;

import java.util.Date;

public interface RecordDTO {
    long getId();
    Date getDate();
    float getWeight();
    int getUnit();
    int getSets();
    int getReps();
}
