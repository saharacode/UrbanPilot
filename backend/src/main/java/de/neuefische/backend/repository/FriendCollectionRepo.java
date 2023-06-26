package de.neuefische.backend.repository;

import de.neuefische.backend.model.friendCollection.UserFriendCollection;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FriendCollectionRepo extends MongoRepository<UserFriendCollection,String> {
    Optional<UserFriendCollection> findUserFriendCollectionById(String id);
}
