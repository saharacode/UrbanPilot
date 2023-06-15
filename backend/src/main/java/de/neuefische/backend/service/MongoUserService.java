package de.neuefische.backend.service;

import de.neuefische.backend.model.MongoUser;
import de.neuefische.backend.repository.MongoUserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.argon2.Argon2PasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MongoUserService implements UserDetailsService {
    private final MongoUserRepo mongoUserRepo;
    private final GenerateUUIDService generateUUIDService;
    PasswordEncoder encoder = Argon2PasswordEncoder.defaultsForSpringSecurity_v5_8();
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        MongoUser mongoUser = mongoUserRepo.findMongoUserByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("The user '" + username + "' could not be found."));
        return new User(mongoUser.getUsername(), mongoUser.getPassword(), List.of());
    }

    public MongoUser registerUser(MongoUser newUserWithoutId) {
        String newUUID = generateUUIDService.generateUUID();
        String hashedPassword = encoder.encode(newUserWithoutId.getPassword());
        MongoUser newUser = new MongoUser(newUUID,newUserWithoutId.getUsername(), hashedPassword, newUserWithoutId.getFullname(), newUserWithoutId.getEmail(), newUserWithoutId.getHomecity());

        return mongoUserRepo.save(newUser);
    }
}
