package de.neuefische.backend.service.user;

import de.neuefische.backend.model.user.ImportMongoUserDTO;
import de.neuefische.backend.model.user.MongoUser;
import de.neuefische.backend.model.user.ReturnMongoUserDTO;
import de.neuefische.backend.repository.MongoUserRepo;
import de.neuefische.backend.service.GenerateUUIDService;
import de.neuefische.backend.service.user.*;
import org.junit.jupiter.api.Test;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.test.annotation.DirtiesContext;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class MongoUserServiceTest {
    MongoUserRepo mongoUserRepo = mock(MongoUserRepo.class);
    GenerateUUIDService generateUUIDService = mock(GenerateUUIDService.class);
    GenerateUserCityCollectionService generateUserCityCollectionService = mock(GenerateUserCityCollectionService.class);
    GenerateUserLocationCollectionService generateUserLocationCollectionService = mock(GenerateUserLocationCollectionService.class);
    GenerateUserFriendCollectionService generateUserFriendCollectionService = mock(GenerateUserFriendCollectionService.class);
    GenerateEncodedPasswordService generateEncodedPasswordService = mock(GenerateEncodedPasswordService.class);
    MongoUserService mongoUserService = new MongoUserService(mongoUserRepo,generateUUIDService,generateUserCityCollectionService,generateUserLocationCollectionService,generateUserFriendCollectionService,generateEncodedPasswordService);

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
        String testCityCollectionId = "testCityCollectionId";
        String testLocationCollectionId = "testLocationCollectionId";
        String testFriendLocationId = "testFriendCollectionId";
        ImportMongoUserDTO newUserWithoutId = ImportMongoUserDTO.builder()
                .username(testUsername)
                .password(testpassword)
                .build();
        MongoUser newUser = MongoUser.builder()
                .id(testUUID)
                .username(testUsername)
                .password(encodedTestpassword)
                .cityCollectionId(testCityCollectionId)
                .locationCollectionId(testLocationCollectionId)
                .friendCollectionId(testFriendLocationId)
                .build();

        when(generateUUIDService.generateUUID()).thenReturn(testUUID);
        when(generateEncodedPasswordService.generateEncodedPassword(newUserWithoutId)).thenReturn(encodedTestpassword);
        when(generateUserCityCollectionService.generateUserCityCollection(newUserWithoutId)).thenReturn(testCityCollectionId);
        when(generateUserLocationCollectionService.generateUserLocationCollection()).thenReturn(testLocationCollectionId);
        when(generateUserFriendCollectionService.generateUserFriendCollection()).thenReturn(testFriendLocationId);
        when(mongoUserRepo.save(newUser)).thenReturn(newUser);

        ReturnMongoUserDTO expectedUser = ReturnMongoUserDTO.builder()
                .username(testUsername)
                .build();

        // when/then
        ReturnMongoUserDTO actualUser = mongoUserService.registerUser(newUserWithoutId);
        assertEquals(expectedUser,actualUser);
        verify(generateUUIDService).generateUUID();
        verify(generateEncodedPasswordService).generateEncodedPassword(newUserWithoutId);
        verify(generateUserCityCollectionService).generateUserCityCollection(newUserWithoutId);
        verify(generateUserLocationCollectionService).generateUserLocationCollection();
        verify(generateUserFriendCollectionService).generateUserFriendCollection();
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