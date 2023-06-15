package de.neuefische.backend.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document("Users")
public class MongoUser {
    private String id;
    private String username;
    private String password;
    private String fullname;
    private String email;
    private String homecity;
}
