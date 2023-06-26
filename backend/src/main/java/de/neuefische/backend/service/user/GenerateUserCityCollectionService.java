package de.neuefische.backend.service.user;

import de.neuefische.backend.model.city.UserCity;
import de.neuefische.backend.model.city.UserCityCollection;
import de.neuefische.backend.model.user.ImportMongoUserDTO;
import de.neuefische.backend.repository.CitiesRepo;
import de.neuefische.backend.repository.CityCollectionRepo;
import de.neuefische.backend.service.GenerateUUIDService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class GenerateUserCityCollectionService {
    private final CityCollectionRepo cityCollectionRepo;
    private final CitiesRepo citiesRepo;
    private final GenerateUUIDService generateUUIDService;

    public String generateUserCityCollection(ImportMongoUserDTO newUserWithoutId){
        String newUUID = generateUUIDService.generateUUID();
        String newUUIDforUnknownCity = generateUUIDService.generateUUID();
        UserCity defaultUserCity = citiesRepo.findUserCityByCityName(newUserWithoutId.getHomecity())
                .orElse(new UserCity(newUUIDforUnknownCity, "unknown City", 52.4, 13.29));
        Map<String, UserCity> newUserCityMap = new HashMap<>();
        newUserCityMap.put(defaultUserCity.getCityId(), defaultUserCity);
        UserCityCollection newUserCityCollection =new UserCityCollection(newUUID,newUserCityMap);
        cityCollectionRepo.save(newUserCityCollection);
        return newUserCityCollection.getId();
    }
}
