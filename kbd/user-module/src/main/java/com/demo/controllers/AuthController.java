package com.demo.controllers;


import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.demo.dto.AuthRequest;
import com.demo.dto.AuthResponse;
import com.demo.dto.ErrorResponse;
import com.demo.entity.User;
import com.demo.repositories.UserRepository;
import com.demo.security.JwtUtil;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthController(UserRepository userRepository, 
                         PasswordEncoder passwordEncoder, 
                         JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody AuthRequest request) {
        try {
            User user = userRepository.findByUsername(request.getUsername())
                    .orElseThrow(() -> new RuntimeException("User not found with username: " + request.getUsername()));

            if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(new ErrorResponse("INVALID_CREDENTIALS", "Invalid username or password", 401));
            }

            String token = jwtUtil.generateToken(user);
            AuthResponse response = new AuthResponse(token, user.getUsername(), "Login successful");
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ErrorResponse("LOGIN_FAILED", e.getMessage(), 401));
        }
    }

    @GetMapping("/profile")
    public ResponseEntity<?> getUserProfile() {
        try {
            // This endpoint requires authentication
            return ResponseEntity.ok("Profile access successful! You are authenticated.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("PROFILE_ERROR", e.getMessage(), 500));
        }
    }
}
