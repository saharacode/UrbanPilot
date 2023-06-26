package de.neuefische.backend.service;

import de.neuefische.backend.model.cityCollection.UserCity;
import de.neuefische.backend.model.cityCollection.UserCityCollection;
import de.neuefische.backend.model.user.ImportMongoUserDTO;
import de.neuefische.backend.repository.CityCollectionRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class GenerateUserCityCollectionService {
    private final CityCollectionRepo cityCollectionRepo;
    private final GenerateUUIDService generateUUIDService;

    public String generateUserCityCollection(ImportMongoUserDTO newUserWithoutId){
        String newUUID = generateUUIDService.generateUUID();
        UserCity defaultUserCity = new UserCity("testCityId", newUserWithoutId.getHomecity(), "testCityCoordinates");
        Map<String, UserCity> newUserCityMap = new HashMap<>();
        newUserCityMap.put(defaultUserCity.getCityId(), defaultUserCity);
        UserCityCollection newUserCityCollection =new UserCityCollection(newUUID,newUserCityMap);
        cityCollectionRepo.save(newUserCityCollection);
        return newUserCityCollection.getId();
    }
}
