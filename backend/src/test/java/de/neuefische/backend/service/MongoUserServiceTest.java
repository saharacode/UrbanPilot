package de.neuefische.backend.service;

import de.neuefische.backend.model.MongoUser;
import de.neuefische.backend.model.ReturnMongoUserDTO;
import de.neuefische.backend.repository.MongoUserRepo;
import org.junit.jupiter.api.Test;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.test.annotation.DirtiesContext;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class MongoUserServiceTest {
    MongoUserRepo mongoUserRepo = mock(MongoUserRepo.class);
    GenerateUUIDService generateUUIDService = mock(GenerateUUIDService.class);
    GenerateDefaultUserCityCollectionService generateDefaultUserCityCollectionService = mock(GenerateDefaultUserCityCollectionService.class);
    MongoUserService mongoUserService = new MongoUserService(mongoUserRepo,generateUUIDService,generateDefaultUserCityCollectionService);

    @DirtiesContext
    @Test
    void loadUserByUsername_() {
    }

    @DirtiesContext
    @Test
    void registerUser() {
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

        // when
        ReturnMongoUserDTO actualUser = mongoUserService.getProfileDetails(testUsername);

        // then
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