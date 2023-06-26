package de.neuefische.backend.service;

import de.neuefische.backend.model.friendCollection.Friend;
import de.neuefische.backend.model.friendCollection.UserFriendCollection;
import de.neuefische.backend.repository.FriendCollectionRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class GenerateUserFriendCollectionService {
    private final FriendCollectionRepo friendCollectionRepo;
    private final GenerateUUIDService generateUUIDService;

    public String generateUserFriendCollection(){
        String newUUID = generateUUIDService.generateUUID();
        Map<String, Friend> newUserFriendMap = new HashMap<>();
        UserFriendCollection newUserFriendCollection = new UserFriendCollection(newUUID,newUserFriendMap);
        friendCollectionRepo.save(newUserFriendCollection);
        return newUserFriendCollection.getId();
    }
}
