package de.neuefische.backend.repository;

import de.neuefische.backend.model.city.UserCity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CitiesRepo extends MongoRepository<UserCity,String> {
    Optional<UserCity> findUserCityByCityName(String cityname);
}
