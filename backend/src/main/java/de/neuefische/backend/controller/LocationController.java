package de.neuefische.backend.controller;

import de.neuefische.backend.model.location.ImportLocationDTO;
import de.neuefische.backend.model.location.Location;
import de.neuefische.backend.service.location.LocationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("locations")
@RequiredArgsConstructor
public class LocationController {
    private final LocationService locationService;

    @GetMapping("/all/{username}")
    public List<Location> getAllLocationsForUser(@PathVariable String username){
        return locationService.getAllLocationsForUser(username);
    }

    @PostMapping("/add/{username}")
    public Location addLocation(@PathVariable String username, @RequestBody ImportLocationDTO newLocationWithoutId){
        return locationService.addLocation(username, newLocationWithoutId);
    }
}
