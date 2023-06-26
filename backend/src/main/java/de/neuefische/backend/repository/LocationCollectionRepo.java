package de.neuefische.backend.repository;

import de.neuefische.backend.model.locationCollection.UserLocationCollection;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LocationCollectionRepo extends MongoRepository<UserLocationCollection,String> {
    Optional<UserLocationCollection> findUserLocationCollectionById(String id);
}
