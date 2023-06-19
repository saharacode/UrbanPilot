package de.neuefische.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class NewMongoUserDTO {
    private String username;
    private String password;
    private String fullname;
    private String email;
    private String homecity;
}
