package com.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.demo.service.UrlService;

@RestController
public class AccessUrlController {
    @Autowired
    private UrlService urlService;
    
    @GetMapping("/{code}")
    public ResponseEntity<String> redirectToOriginal(@PathVariable String code) {
        String originalUrl = urlService.getOriginalUrlByCode(code);
        return ResponseEntity.status(200).body(originalUrl);
    }
    
}
