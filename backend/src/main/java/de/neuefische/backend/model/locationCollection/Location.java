package de.neuefische.backend.model.locationCollection;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Location {
    private String locationId;
    private String locationName;
    private String locationCity;
    private String locationCoordinates;
    private String locationType;
}
