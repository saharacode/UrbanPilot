package de.neuefische.backend.repository;

import de.neuefische.backend.model.user.MongoUser;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MongoUserRepo extends MongoRepository<MongoUser,String> {
    Optional<MongoUser> findMongoUserByUsername(String username);
}
