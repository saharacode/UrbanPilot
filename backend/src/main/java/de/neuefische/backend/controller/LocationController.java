package de.neuefische.backend.controller;

import de.neuefische.backend.model.UserCityCollectionDTO;
import de.neuefische.backend.service.LocationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("locations")
@RequiredArgsConstructor
public class LocationController {
    private final LocationService locationService;

    @GetMapping("/all/{username}")
    public UserCityCollectionDTO getProfileDetails(@PathVariable String username){
        return locationService.getAllLocationsForUser(username);
    }
}
