package de.neuefische.backend.repository;

import de.neuefische.backend.model.cityCollection.UserCityCollection;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CityCollectionRepo extends MongoRepository<UserCityCollection,String> {
    Optional<UserCityCollection> findUserCityCollectionById(String id);
}
