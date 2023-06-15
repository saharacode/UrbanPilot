package de.neuefische.backend.service;

import de.neuefische.backend.model.Location;
import de.neuefische.backend.model.MongoUser;
import de.neuefische.backend.model.UserCity;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class GenerateDefaultUserCityCollectionService {
    public Map<String, UserCity> generateDefaultUserCityCollection(MongoUser newUserWithoutId){
        Map<String, Location> newEmptyLocationCollection = new HashMap<>();
        // TODO: get cityid/coordinates/country from city-api/database
        UserCity defaultUserCity = new UserCity("defaultCityId",newUserWithoutId.getHomecity(),"defaultCityCoordinates","defaultCityCountry",newEmptyLocationCollection);
        Map<String, UserCity> newUserCityCollection = new HashMap<>();
        newUserCityCollection.put(defaultUserCity.getCityId(),defaultUserCity);
        return newUserCityCollection;
    }
}
