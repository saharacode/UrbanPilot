package de.neuefische.backend.service.location;

import de.neuefische.backend.model.location.ImportLocationDTO;
import de.neuefische.backend.model.location.Location;
import de.neuefische.backend.model.location.UserLocationCollection;
import de.neuefische.backend.model.user.MongoUser;
import de.neuefische.backend.repository.LocationCollectionRepo;
import de.neuefische.backend.repository.MongoUserRepo;
import de.neuefische.backend.service.GenerateUUIDService;
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
    private final GenerateUUIDService generateUUIDService;

    public UserLocationCollection getLocationCollectionForUser(String username){
        MongoUser mongoUserComplete = mongoUserRepo.findMongoUserByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("The user '" + username + "' could not be found."));

        return locationCollectionRepo.findUserLocationCollectionById(mongoUserComplete.getLocationCollectionId())
                .orElse(new UserLocationCollection());
    }

    public List<Location> getAllLocationsForUser(String username) {
        UserLocationCollection userLocationCollection = getLocationCollectionForUser(username);
        return new ArrayList<>(userLocationCollection.getUserLocationMap().values());
    }

    public Location addLocation(String username, ImportLocationDTO newLocationWithoutId) {
        String newUUID = generateUUIDService.generateUUID();
        Location newLocation = Location.builder()
                .locationId(newUUID)
                .locationCity(newLocationWithoutId.getLocationCity())
                .locationDescription(newLocationWithoutId.getLocationDescription())
                .locationName(newLocationWithoutId.getLocationName())
                .locationType(newLocationWithoutId.getLocationType())
                .locationLatCoordinate(newLocationWithoutId.getLocationLatCoordinate())
                .locationLngCoordinate(newLocationWithoutId.getLocationLngCoordinate())
                .build();

        UserLocationCollection userLocationCollection = getLocationCollectionForUser(username);
        userLocationCollection.getUserLocationMap().put(newUUID,newLocation);
        locationCollectionRepo.save(userLocationCollection);

        return userLocationCollection.getUserLocationMap().get(newUUID);
    }

    public String deleteLocation(String username, String locationId) {
        UserLocationCollection userLocationCollection = getLocationCollectionForUser(username);
        userLocationCollection.getUserLocationMap().remove(locationId);
        locationCollectionRepo.save(userLocationCollection);

        return locationId;
    }

    public Location editLocation(String username, Location editedLocation) {
        UserLocationCollection userLocationCollection = getLocationCollectionForUser(username);
        userLocationCollection.getUserLocationMap().replace(editedLocation.getLocationId(),editedLocation);
        locationCollectionRepo.save(userLocationCollection);

        return userLocationCollection.getUserLocationMap().get(editedLocation.getLocationId());
    }
}
