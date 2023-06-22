package de.neuefische.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserCity {
    private String cityId;
    private String cityName;
    private String cityCoordinates;
    private String cityCountry;
    private Map<String, Location> locationCollection;
}
