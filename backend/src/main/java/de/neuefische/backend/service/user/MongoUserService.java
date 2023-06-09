package de.neuefische.backend.service.user;

import de.neuefische.backend.exceptions.UsernameAlreadyExistsException;
import de.neuefische.backend.model.user.ImportMongoUserDTO;
import de.neuefische.backend.model.user.MongoUser;
import de.neuefische.backend.model.user.ReturnMongoUserDTO;
import de.neuefische.backend.repository.MongoUserRepo;
import de.neuefische.backend.service.GenerateUUIDService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MongoUserService implements UserDetailsService {
    private final MongoUserRepo mongoUserRepo;
    private final GenerateUUIDService generateUUIDService;
    private final GenerateUserCityCollectionService generateUserCityCollectionService;
    private final GenerateUserLocationCollectionService generateUserLocationCollectionService;
    private final GenerateUserFriendCollectionService generateUserFriendCollectionService;
    private final GenerateEncodedPasswordService generateEncodedPasswordService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        MongoUser mongoUser = mongoUserRepo.findMongoUserByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("The user '" + username + "' could not be found."));
        return new User(mongoUser.getUsername(), mongoUser.getPassword(), List.of());
    }

    public ReturnMongoUserDTO registerUser(ImportMongoUserDTO newUserWithoutId) {
        boolean usernameAlreadyExists = mongoUserRepo.findMongoUserByUsername(newUserWithoutId.getUsername()).isPresent();

        if (usernameAlreadyExists){
            throw new UsernameAlreadyExistsException("Username already exists.");
        } else {
            String newUUID = generateUUIDService.generateUUID();
            String hashedPassword = generateEncodedPasswordService.generateEncodedPassword(newUserWithoutId);
            String cityCollectionId = generateUserCityCollectionService.generateUserCityCollection(newUserWithoutId);
            String locationCollectionId = generateUserLocationCollectionService.generateUserLocationCollection();
            String friendCollectionId = generateUserFriendCollectionService.generateUserFriendCollection();

            MongoUser newUser = new MongoUser(newUUID,newUserWithoutId.getUsername(), hashedPassword, newUserWithoutId.getFullname(), newUserWithoutId.getEmail(), newUserWithoutId.getHomecity(), cityCollectionId, locationCollectionId, friendCollectionId);
            mongoUserRepo.save(newUser);
            return new ReturnMongoUserDTO(newUserWithoutId.getUsername(), newUserWithoutId.getFullname(), newUserWithoutId.getEmail(), newUserWithoutId.getHomecity());
        }
    }


    public ReturnMongoUserDTO getProfileDetails(String username) {
        MongoUser mongoUserComplete = mongoUserRepo.findMongoUserByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("The user '" + username + "' could not be found."));
        return new ReturnMongoUserDTO(mongoUserComplete.getUsername(),mongoUserComplete.getFullname(),mongoUserComplete.getEmail(),mongoUserComplete.getHomecity());
    }
}
