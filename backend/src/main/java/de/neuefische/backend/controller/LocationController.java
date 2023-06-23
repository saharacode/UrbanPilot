package de.neuefische.backend.controller;

import de.neuefische.backend.model.ReturnMongoUserDTO;
import de.neuefische.backend.service.MongoUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("locations")
@RequiredArgsConstructor
public class LocationController {
    private final MongoUserService mongoUserService;

    @GetMapping("/all/{username}")
    public ReturnMongoUserDTO getProfileDetails(@PathVariable String username){
        return mongoUserService.getProfileDetails(username);
    }
}
