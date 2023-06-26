package de.neuefische.backend.model.cityCollection;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document("UserCityCollection")
@Builder
public class UserCityCollection {
    private String id;
    private Map<String, UserCity> userCityCollection;
}
