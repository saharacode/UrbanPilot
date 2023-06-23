package de.neuefische.backend.service;

import de.neuefische.backend.model.*;
import de.neuefische.backend.repository.MongoUserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LocationService {
    private final MongoUserRepo mongoUserRepo;

    public List<Location> getAllLocationsForUser(String username) {
        MongoUser mongoUserComplete = mongoUserRepo.findMongoUserByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("The user '" + username + "' could not be found."));

        List<Location> locations = mongoUserComplete.getUserCityCollection().values().stream()
                .flatMap(city -> city.getLocationCollection().values().stream())
                .collect(Collectors.toList());

        return locations;
    }
}
