package de.neuefische.backend.model.friend;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document("UserFriendCollection")
@Builder
public class UserFriendCollection {
    private String id;
    private Map<String, Friend> userFriendMap;
}
