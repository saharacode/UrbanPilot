package de.neuefische.backend.repository;

import de.neuefische.backend.model.cityCollection.UserCity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CitiesRepo extends MongoRepository<UserCity,String> {
    Optional<UserCity> findUserCityByCityId(String cityId);
}
