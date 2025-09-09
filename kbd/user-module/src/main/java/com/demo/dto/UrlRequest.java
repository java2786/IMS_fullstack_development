package com.demo.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public class UrlRequest {
    @NotBlank(message = "Original URL is required")
    @Pattern(regexp = "^https?://.*", message = "URL must start with http:// or https://")
    private String originalUrl;

    // Constructors
    public UrlRequest() {}

    public UrlRequest(String originalUrl) {
        this.originalUrl = originalUrl;
    }

    // Getters and Setters
    public String getOriginalUrl() { return originalUrl; }
    public void setOriginalUrl(String originalUrl) { this.originalUrl = originalUrl; }
}