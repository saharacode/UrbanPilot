package de.neuefische.backend.service.user;

import de.neuefische.backend.model.location.Location;
import de.neuefische.backend.model.location.UserLocationCollection;
import de.neuefische.backend.repository.LocationCollectionRepo;
import de.neuefische.backend.service.GenerateUUIDService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class GenerateUserLocationCollectionService {
    private final LocationCollectionRepo locationCollectionRepo;
    private final GenerateUUIDService generateUUIDService;

    public String generateUserLocationCollection(){
        String newUUID = generateUUIDService.generateUUID();
        Map<String, Location> newUserLocationMap = new HashMap<>();
        UserLocationCollection newUserLocationCollection = new UserLocationCollection(newUUID,newUserLocationMap);
        return locationCollectionRepo.save(newUserLocationCollection).getId();
    }
}
