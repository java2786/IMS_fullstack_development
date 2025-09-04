package com.demo.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/demo/api/users")
public class DemoController {

    // localhost:8080/api/users
    @GetMapping
    public String greet(){
        return "Welcome User!";
    }


    // localhost:8080/api/users/{mahesh}
    @GetMapping("/{name}")
    public String greetUser(@PathVariable String name){
        return "Welcome "+name+"!";
    }
}
