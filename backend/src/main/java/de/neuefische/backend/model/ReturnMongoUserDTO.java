package de.neuefische.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReturnMongoUserDTO {
    private String username;
    private String fullname;
    private String email;
    private String homecity;
}
