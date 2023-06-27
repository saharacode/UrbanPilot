package de.neuefische.backend.service.user;

import de.neuefische.backend.model.friend.Friend;
import de.neuefische.backend.model.friend.UserFriendCollection;
import de.neuefische.backend.repository.FriendCollectionRepo;
import de.neuefische.backend.service.GenerateUUIDService;
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
        return friendCollectionRepo.save(newUserFriendCollection).getId();
    }
}
