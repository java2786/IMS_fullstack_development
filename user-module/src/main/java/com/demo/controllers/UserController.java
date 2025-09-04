package com.demo.controllers;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.demo.entity.User;
import com.demo.repositories.UserRepository;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    UserRepository userRepository;
    
    @PostMapping("/login")
    public String loginUser(@RequestBody User user){
        System.out.println(user);

        Optional<User> optional = userRepository.findById(user.getEmail());

        if(optional.isPresent()){
            User dbUser = optional.get();
            if(user.getPassword().equals(dbUser.getPassword())){
                return "User logged in successfully!";
            } else {
                return "Invalid credentials!";
            }
        }

        return "Email not found!";
    }

    @PostMapping("/register")
    public String registrationUser(@RequestBody @Valid User user){
        System.out.println(user);
        userRepository.save(user);
        return "User registered in successfully!";
    }

}
