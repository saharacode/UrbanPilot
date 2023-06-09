package de.neuefische.backend.model.city;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document("Cities")
public class UserCity {
    private String cityId;
    private String cityName;
    private double cityLatCoordinate;
    private double cityLngCoordinate;
}
