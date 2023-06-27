package de.neuefische.backend.model.location;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Location {
    private String locationId;
    private String locationName;
    private String locationCity;
    private String locationDescription;
    private double locationLatCoordinate;
    private double locationLngCoordinate;
    private String locationType;
}
