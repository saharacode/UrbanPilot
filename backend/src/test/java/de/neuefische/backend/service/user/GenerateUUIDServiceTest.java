package de.neuefische.backend.service.user;

import de.neuefische.backend.service.GenerateUUIDService;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class GenerateUUIDServiceTest {
    GenerateUUIDService generateUUIDService = new GenerateUUIDService();
    @Test
    void generateUUID() {
        String uuid = generateUUIDService.generateUUID();
        assertNotNull(uuid);
    }
}