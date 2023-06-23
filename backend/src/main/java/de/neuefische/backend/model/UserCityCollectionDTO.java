package de.neuefische.backend.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document("Users")
@Builder
public class UserCityCollectionDTO {
    private Map<String, UserCity> userCityCollection;
}
