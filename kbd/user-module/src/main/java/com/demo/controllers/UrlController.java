package com.demo.controllers;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import jakarta.validation.Valid;
import com.demo.dto.UrlRequest;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class UrlController {

    // Your existing URL shortening code here...

    @PostMapping("/shorten")
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public ResponseEntity<?> shortenUrl(@Valid @RequestBody UrlRequest request) {
        String currentUser = SecurityContextHolder.getContext().getAuthentication().getName();
        System.out.println("URL shortened by user: " + currentUser);
        
        // Your existing URL shortening logic here
        // Make sure to associate the URL with the current user if needed
        
        return ResponseEntity.ok("URL shortened successfully by " + currentUser + " for URL: " + request.getOriginalUrl());
    }

    @GetMapping("/admin/urls")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<?> getAllUrls() {
        String currentAdmin = SecurityContextHolder.getContext().getAuthentication().getName();
        System.out.println("Admin accessing all URLs: " + currentAdmin);
        
        // Return all URL mappings - admin only feature
        return ResponseEntity.ok("All URLs accessed by admin: " + currentAdmin);
    }
}
