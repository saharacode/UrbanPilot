package de.neuefische.backend.controller;

import de.neuefische.backend.model.MongoUser;
import de.neuefische.backend.service.MongoUserService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("user")
@RequiredArgsConstructor
public class UserController {
    private final MongoUserService mongoUserService;

    @PostMapping("/login")
    public String login(){
        System.out.println(SecurityContextHolder.getContext());
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
    public MongoUser registerUser(@RequestBody MongoUser newUser){
        return mongoUserService.registerUser(newUser);
    }
}
