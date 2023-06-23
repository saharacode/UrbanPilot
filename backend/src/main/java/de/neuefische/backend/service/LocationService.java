package de.neuefische.backend.service;

import de.neuefische.backend.model.*;
import de.neuefische.backend.repository.MongoUserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LocationService {
    private final MongoUserRepo mongoUserRepo;

    public UserCityCollectionDTO getAllLocationsForUser(String username) {
        MongoUser mongoUserComplete = mongoUserRepo.findMongoUserByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("The user '" + username + "' could not be found."));
        return new UserCityCollectionDTO(mongoUserComplete.getUserCityCollection());
    }
}
