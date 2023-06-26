package de.neuefische.backend.service;

import de.neuefische.backend.model.cityCollection.UserCity;
import de.neuefische.backend.model.friendCollection.Friend;
import de.neuefische.backend.model.user.ImportMongoUserDTO;
import de.neuefische.backend.model.user.MongoUser;
import de.neuefische.backend.model.user.ReturnMongoUserDTO;
import de.neuefische.backend.repository.MongoUserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class MongoUserService implements UserDetailsService {
    private final MongoUserRepo mongoUserRepo;
    private final GenerateUUIDService generateUUIDService;
    private final GenerateDefaultUserCityCollectionService generateDefaultUserCityCollectionService;
    private final GenerateEncodedPasswordService generateEncodedPasswordService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        MongoUser mongoUser = mongoUserRepo.findMongoUserByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("The user '" + username + "' could not be found."));
        return new User(mongoUser.getUsername(), mongoUser.getPassword(), List.of());
    }

    public ReturnMongoUserDTO registerUser(ImportMongoUserDTO newUserWithoutId) {
        String newUUID = generateUUIDService.generateUUID();
        String hashedPassword = generateEncodedPasswordService.generateEncodedPassword(newUserWithoutId);
        Map<String, UserCity> newUserCityCollection = generateDefaultUserCityCollectionService.generateDefaultUserCityCollection(newUserWithoutId);
        Map<String, Friend> newEmptyFriendCollection = new HashMap<>();

        MongoUser newUser = new MongoUser(newUUID,newUserWithoutId.getUsername(), hashedPassword, newUserWithoutId.getFullname(), newUserWithoutId.getEmail(), newUserWithoutId.getHomecity(), newUserCityCollection, newEmptyFriendCollection);
        mongoUserRepo.save(newUser);
        return new ReturnMongoUserDTO(newUserWithoutId.getUsername(), newUserWithoutId.getFullname(), newUserWithoutId.getEmail(), newUserWithoutId.getHomecity());
    }


    public ReturnMongoUserDTO getProfileDetails(String username) {
        MongoUser mongoUserComplete = mongoUserRepo.findMongoUserByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("The user '" + username + "' could not be found."));
        return new ReturnMongoUserDTO(mongoUserComplete.getUsername(),mongoUserComplete.getFullname(),mongoUserComplete.getEmail(),mongoUserComplete.getHomecity());
    }
}
