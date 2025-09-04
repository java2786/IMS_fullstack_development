package com.demo.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;

@Entity(name = "Customers")
public class User {
    @Size(min = 3, max = 5)
    private String username;
    @Size(min = 3, max = 5)
    // regex pattern
    private String password;
    @Id
    @Email
    private String email;

    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getEmail() {
        return email;
    }
    @Override
    public String toString() {
        return "User [username=" + username + ", password=" + password + ", email=" + email + "]";
    }

    // setters and getters
    // default constructors
    // toString method

    

}
