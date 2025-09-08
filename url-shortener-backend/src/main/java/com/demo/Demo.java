package com.demo;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

public class Demo {
    public static void main(String[] args) {
        PasswordEncoder encoder = new BCryptPasswordEncoder();
        String pwd = "abc@123";
        String encodedStr = encoder.encode(pwd);
        System.out.println(encodedStr);

        System.out.println(encoder.matches(pwd, "$2a$10$wVI0uT6hf8UF1ehU7VpA0OyR4RlVqtYtskT5up4z321YjUGwno5IE"));
        System.out.println(encoder.matches(pwd, encodedStr));

    }
}
