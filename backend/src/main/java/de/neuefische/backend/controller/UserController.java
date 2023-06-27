package de.neuefische.backend.controller;

import de.neuefische.backend.model.user.ImportMongoUserDTO;
import de.neuefische.backend.model.user.ReturnMongoUserDTO;
import de.neuefische.backend.service.user.MongoUserService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("user")
@RequiredArgsConstructor
public class UserController {
    private final MongoUserService mongoUserService;

    @PostMapping("/login")
    public String login(){
        return SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();
    }

    @PostMapping("/logout")
    String logout(HttpSession httpSession) {
        httpSession.invalidate();
        SecurityContextHolder.clearContext();
        return "Logout successful";
    }

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public ReturnMongoUserDTO registerUser(@RequestBody ImportMongoUserDTO newUserWithoutId){
        return mongoUserService.registerUser(newUserWithoutId);
    }

    @GetMapping("/details/{username}")
    public ReturnMongoUserDTO getProfileDetails(@PathVariable String username){
        return mongoUserService.getProfileDetails(username);
    }
}
