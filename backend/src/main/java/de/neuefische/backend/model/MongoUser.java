package de.neuefische.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Map;

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
    private Map<String, UserCity> userCityCollection;

    public MongoUser(String username, String fullname, String email, String homecity) {
        this.username = username;
        this.fullname = fullname;
        this.email = email;
        this.homecity = homecity;
    }
}
