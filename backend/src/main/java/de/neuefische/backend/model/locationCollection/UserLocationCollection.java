package de.neuefische.backend.model.locationCollection;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document("UserLocationCollection")
@Builder
public class UserLocationCollection {
    private String id;
    private Map<String, Location> userLocationMap;
}
