package de.neuefische.backend.controller;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("user")
public class UserController {
    @PostMapping("/login")
    public String login(){
        System.out.println(SecurityContextHolder.getContext());
        return SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();
    }

    @GetMapping("/login2")
    public String login2(){
        System.out.println(SecurityContextHolder.getContext());
        return SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();
    }
}
