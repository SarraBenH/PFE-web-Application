package com.pfe.projet.controllers;

import com.pfe.projet.dtos.requests.UserRequest;
import com.pfe.projet.dtos.responses.UserResponse;
import com.pfe.projet.services.UserService;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api")
public class UserController {
	
    @Autowired
    UserService userService;
    
    @GetMapping("/user/{id}")
    ResponseEntity<UserResponse> getUser(@PathVariable String id){
        return ResponseEntity.of(userService.getUser(id));
    }
    @PostMapping("/user")
    ResponseEntity<UserResponse> createUser(@RequestBody UserRequest userRequest){
        return ResponseEntity.of(userService.createUser(userRequest));
    }
    @GetMapping("/user")
    ResponseEntity<List<UserResponse>> getAllUsers(){
        return new ResponseEntity<>(userService.getAllUsers(), HttpStatus.OK);
    }
    @GetMapping("/user/email/{email}")
    ResponseEntity<UserResponse> getUserByEmail(@PathVariable String email){
        return ResponseEntity.of(userService.getUserByEmail(email));
    }
    
    @PutMapping("/user/{id}")
     ResponseEntity<UserResponse> updateUser(@PathVariable String id ,@RequestBody UserRequest userRequest) {
        return ResponseEntity.of(userService.updateUser(id , userRequest)) ;
    }
    
}
