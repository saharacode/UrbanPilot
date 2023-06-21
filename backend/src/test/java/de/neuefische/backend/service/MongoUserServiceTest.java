package de.neuefische.backend.service;

import de.neuefische.backend.model.*;
import de.neuefische.backend.repository.MongoUserRepo;
import org.junit.jupiter.api.Test;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.test.annotation.DirtiesContext;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class MongoUserServiceTest {
    MongoUserRepo mongoUserRepo = mock(MongoUserRepo.class);
    GenerateUUIDService generateUUIDService = mock(GenerateUUIDService.class);
    GenerateDefaultUserCityCollectionService generateDefaultUserCityCollectionService = mock(GenerateDefaultUserCityCollectionService.class);
    GenerateEncodedPasswordService generateEncodedPasswordService = mock(GenerateEncodedPasswordService.class);
    MongoUserService mongoUserService = new MongoUserService(mongoUserRepo,generateUUIDService,generateDefaultUserCityCollectionService,generateEncodedPasswordService);

    @DirtiesContext
    @Test
    void loadUserByUsername_returnUser() {
        // given
        String testUsername = "testuser";
        String testPassword = "testpassword";
        MongoUser testMongoUser = MongoUser.builder()
                .username(testUsername)
                .password(testPassword)
                .build();
        when(mongoUserRepo.findMongoUserByUsername(testUsername)).thenReturn(Optional.ofNullable(testMongoUser));

        UserDetails expectedUserDetails = new User(testUsername,testPassword, List.of());

        // when/then
        UserDetails actualUserDetails = mongoUserService.loadUserByUsername(testUsername);
        assertEquals(expectedUserDetails, actualUserDetails);
        verify(mongoUserRepo).findMongoUserByUsername(testUsername);
    }

    @DirtiesContext
    @Test
    void loadUserByUsername_throwsUsernameNotFoundException() {
        // given
        String testUsername = "unexpectedUser";

        when(mongoUserRepo.findMongoUserByUsername(testUsername)).thenReturn(Optional.empty());

        // when/then
        assertThrows(UsernameNotFoundException.class,() -> mongoUserService.loadUserByUsername(testUsername));
        verify(mongoUserRepo).findMongoUserByUsername(testUsername);
    }

    @DirtiesContext
    @Test
    void registerUser_returnNewUser() {
        // given
        String testUsername = "testuser";
        String testUUID = "testUUID";
        String testpassword = "testpassword";
        String encodedTestpassword = "encodedTestpassword";
        Map<String, UserCity> testNewUserCityCollection = new HashMap<>();
        Map<String, Friend> testNewEmptyFriendCollection = new HashMap<>();
        ImportMongoUserDTO newUserWithoutId = ImportMongoUserDTO.builder()
                .username(testUsername)
                .password(testpassword)
                .build();
        MongoUser newUser = MongoUser.builder()
                .id(testUUID)
                .username(testUsername)
                .password(encodedTestpassword)
                .userCityCollection(testNewUserCityCollection)
                .friendCollection(testNewEmptyFriendCollection)
                .build();

        when(generateUUIDService.generateUUID()).thenReturn(testUUID);
        when(generateEncodedPasswordService.generateEncodedPassword(newUserWithoutId)).thenReturn(encodedTestpassword);
        when(generateDefaultUserCityCollectionService.generateDefaultUserCityCollection(newUserWithoutId)).thenReturn(testNewUserCityCollection);
        when(mongoUserRepo.save(newUser)).thenReturn(newUser);

        ReturnMongoUserDTO expectedUser = ReturnMongoUserDTO.builder()
                .username(testUsername)
                .build();

        // when/then
        ReturnMongoUserDTO actualUser = mongoUserService.registerUser(newUserWithoutId);
        assertEquals(expectedUser,actualUser);
        verify(generateUUIDService).generateUUID();
        verify(generateEncodedPasswordService).generateEncodedPassword(newUserWithoutId);
        verify(generateDefaultUserCityCollectionService).generateDefaultUserCityCollection(newUserWithoutId);
        verify(mongoUserRepo).save(newUser);

    }

    @DirtiesContext
    @Test
    void getProfileDetails_returnUser() {
        // given
        String testUsername = "testuser";
        MongoUser mongoUserComplete = MongoUser.builder()
                .username(testUsername)
                .build();
        when(mongoUserRepo.findMongoUserByUsername(testUsername)).thenReturn(Optional.ofNullable(mongoUserComplete));

        ReturnMongoUserDTO expectedUser = ReturnMongoUserDTO.builder()
                .username(testUsername)
                .build();

        // when/then
        ReturnMongoUserDTO actualUser = mongoUserService.getProfileDetails(testUsername);
        assertEquals(expectedUser,actualUser);
        verify(mongoUserRepo).findMongoUserByUsername(testUsername);

    }

    @DirtiesContext
    @Test
    void getProfileDetails_throwsUsernameNotFoundException() {
        // given
        String testUsername = "unknownUser";
        when(mongoUserRepo.findMongoUserByUsername(testUsername)).thenReturn(Optional.empty());

        // when/then
        assertThrows(UsernameNotFoundException.class,() -> mongoUserService.getProfileDetails(testUsername));
        verify(mongoUserRepo).findMongoUserByUsername(testUsername);

    }
}