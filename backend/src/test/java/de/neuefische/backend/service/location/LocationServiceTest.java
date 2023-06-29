package de.neuefische.backend.service.location;

import de.neuefische.backend.model.location.ImportLocationDTO;
import de.neuefische.backend.model.location.Location;
import de.neuefische.backend.model.location.UserLocationCollection;
import de.neuefische.backend.model.user.MongoUser;
import de.neuefische.backend.repository.LocationCollectionRepo;
import de.neuefische.backend.repository.MongoUserRepo;
import de.neuefische.backend.service.GenerateUUIDService;
import org.junit.jupiter.api.Test;
import org.springframework.test.annotation.DirtiesContext;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class LocationServiceTest {
    MongoUserRepo mongoUserRepo = mock(MongoUserRepo.class);
    LocationCollectionRepo locationCollectionRepo = mock(LocationCollectionRepo.class);
    GenerateUUIDService generateUUIDService = mock(GenerateUUIDService.class);
    LocationService locationService = new LocationService(mongoUserRepo,locationCollectionRepo,generateUUIDService);

    @DirtiesContext
    @Test
    void getAllLocationsForUser_returnList() {
        //given
        String testUsername = "testuser";
        String testLocationCollectionId = "testLocationCollectionId";
        MongoUser testMongoUser = MongoUser.builder()
                .username(testUsername)
                .locationCollectionId(testLocationCollectionId)
                .build();
        when(mongoUserRepo.findMongoUserByUsername(testUsername)).thenReturn(Optional.ofNullable(testMongoUser));

        String testLocationId = "testLocationId";
        Location testlocation = Location.builder()
                .locationId(testLocationId)
                .build();
        Map<String, Location> testUserLocationMap = new HashMap<>();
        testUserLocationMap.put(testLocationId,testlocation);
        UserLocationCollection testUserLocationCollection = UserLocationCollection.builder()
                .id(testLocationCollectionId)
                .userLocationMap(testUserLocationMap)
                .build();
        when(locationCollectionRepo.findUserLocationCollectionById(testLocationCollectionId)).thenReturn(Optional.ofNullable(testUserLocationCollection));

        List<Location> expectedLocationList = new ArrayList<>();
        expectedLocationList.add(testlocation);

        //when/then
        List<Location> actualLocationList = locationService.getAllLocationsForUser(testUsername);
        assertEquals(expectedLocationList,actualLocationList);
        verify(mongoUserRepo).findMongoUserByUsername(testUsername);
        verify(locationCollectionRepo).findUserLocationCollectionById(testLocationCollectionId);
    }

    @DirtiesContext
    @Test
    void addLocation_returnNewLocation(){
        //given
        String testUsername = "testuser";
        String testLocationCollectionId = "testLocationCollectionId";
        MongoUser testMongoUser = MongoUser.builder()
                .username(testUsername)
                .locationCollectionId(testLocationCollectionId)
                .build();
        when(mongoUserRepo.findMongoUserByUsername(testUsername)).thenReturn(Optional.ofNullable(testMongoUser));

        Map<String, Location> testUserLocationMap = new HashMap<>();
        UserLocationCollection testUserLocationCollection = UserLocationCollection.builder()
                .id(testLocationCollectionId)
                .userLocationMap(testUserLocationMap)
                .build();
        when(locationCollectionRepo.findUserLocationCollectionById(testLocationCollectionId)).thenReturn(Optional.ofNullable(testUserLocationCollection));

        String testUUID = "testUUID";
        when(generateUUIDService.generateUUID()).thenReturn(testUUID);

        String testLocationName = "testLocationName";
        ImportLocationDTO testImportLocationDTO = ImportLocationDTO.builder()
                .locationName(testLocationName)
                .build();

        Location expectedLocation = Location.builder()
                .locationId(testUUID)
                .locationName(testLocationName)
                .build();

        //when/then
        Location actualLocation = locationService.addLocation(testUsername,testImportLocationDTO);
        assertEquals(expectedLocation,actualLocation);
        verify(mongoUserRepo).findMongoUserByUsername(testUsername);
        verify(locationCollectionRepo).findUserLocationCollectionById(testLocationCollectionId);
        verify(generateUUIDService).generateUUID();
    }

    @DirtiesContext
    @Test
    void deleteLocation_returnLocationId(){
        //given
        String testUsername = "testuser";
        String testLocationCollectionId = "testLocationCollectionId";
        MongoUser testMongoUser = MongoUser.builder()
                .username(testUsername)
                .locationCollectionId(testLocationCollectionId)
                .build();
        when(mongoUserRepo.findMongoUserByUsername(testUsername)).thenReturn(Optional.ofNullable(testMongoUser));

        String testLocationId = "testLocationId";
        Location testlocation = Location.builder()
                .locationId(testLocationId)
                .build();
        Map<String, Location> testUserLocationMap = new HashMap<>();
        testUserLocationMap.put(testLocationId,testlocation);
        UserLocationCollection testUserLocationCollection = UserLocationCollection.builder()
                .id(testLocationCollectionId)
                .userLocationMap(testUserLocationMap)
                .build();
        when(locationCollectionRepo.findUserLocationCollectionById(testLocationCollectionId)).thenReturn(Optional.ofNullable(testUserLocationCollection));

        //when/then
        String actualId = locationService.deleteLocation(testUsername,testLocationId);
        assertEquals(testLocationId,actualId);
        verify(mongoUserRepo).findMongoUserByUsername(testUsername);
        verify(locationCollectionRepo).findUserLocationCollectionById(testLocationCollectionId);
    }
}