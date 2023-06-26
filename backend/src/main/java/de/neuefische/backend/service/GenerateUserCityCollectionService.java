package de.neuefische.backend.service;

import de.neuefische.backend.model.cityCollection.UserCity;
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

    public Map<String, UserCity> generateUserCityCollection(){
        Map<String, UserCity> newUserCityCollection = new HashMap<>();
        newUserCityCollection.put(defaultUserCity.getCityId(),defaultUserCity);
        return newUserCityCollection;
    }
}
