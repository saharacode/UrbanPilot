package de.neuefische.backend.service.location;

import de.neuefische.backend.model.location.Location;
import de.neuefische.backend.model.location.UserLocationCollection;
import de.neuefische.backend.model.user.MongoUser;
import de.neuefische.backend.repository.LocationCollectionRepo;
import de.neuefische.backend.repository.MongoUserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class LocationService {
    private final MongoUserRepo mongoUserRepo;
    private final LocationCollectionRepo locationCollectionRepo;

    public List<Location> getAllLocationsForUser(String username) {
        MongoUser mongoUserComplete = mongoUserRepo.findMongoUserByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("The user '" + username + "' could not be found."));

        UserLocationCollection newLocationCollection = locationCollectionRepo.findUserLocationCollectionById(mongoUserComplete.getLocationCollectionId())
                .orElse(new UserLocationCollection());

        return new ArrayList<>(newLocationCollection.getUserLocationMap().values());
    }
}
