package de.neuefische.backend.service;

import de.neuefische.backend.model.user.ImportMongoUserDTO;
import org.springframework.security.crypto.argon2.Argon2PasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
public class GenerateEncodedPasswordService {
    PasswordEncoder encoder = Argon2PasswordEncoder.defaultsForSpringSecurity_v5_8();
    public String generateEncodedPassword(ImportMongoUserDTO newUserWithoutId){
        return encoder.encode(newUserWithoutId.getPassword());
    }
}
