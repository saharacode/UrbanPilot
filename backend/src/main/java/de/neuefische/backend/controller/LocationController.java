package de.neuefische.backend.controller;

import de.neuefische.backend.model.Location;
import de.neuefische.backend.service.LocationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("locations")
@RequiredArgsConstructor
public class LocationController {
    private final LocationService locationService;

    @GetMapping("/all/{username}")
    public List<Location> getProfileDetails(@PathVariable String username){
        return locationService.getAllLocationsForUser(username);
    }
}
