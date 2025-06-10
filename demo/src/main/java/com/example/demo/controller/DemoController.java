package com.example.demo.controller;

import com.example.demo.DemoDTO;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
public class DemoController {
    @PostMapping("/submit")
    public ResponseEntity<String> submitFeedback(@RequestBody DemoDTO demo) {
        System.out.println("Получена обратная связь: " + demo.getName() + " - " + demo.getEmail());
        System.out.println(demo.getMessage());
        return ResponseEntity.ok("Спасибо за ваш отзыв!");
    }
}
