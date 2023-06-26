package de.neuefische.backend.model.cityCollection;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserCity {
    private String cityId;
    private String cityName;
    private String cityCoordinates;
}
