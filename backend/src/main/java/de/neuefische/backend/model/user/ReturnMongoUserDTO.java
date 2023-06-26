package de.neuefische.backend.model.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReturnMongoUserDTO {
    private String username;
    private String fullname;
    private String email;
    private String homecity;
}
