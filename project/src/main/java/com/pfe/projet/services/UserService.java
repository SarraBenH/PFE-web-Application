package com.pfe.projet.services;

import com.pfe.projet.dtos.requests.UserRequest;
import com.pfe.projet.dtos.responses.UserResponse;

import java.util.List;
import java.util.Optional;

public interface UserService {


    Optional<UserResponse> getUser(String id);
    Optional<UserResponse> createUser(UserRequest userRequest);

    List<UserResponse> getAllUsers();
    Optional<UserResponse> getUserByEmail(String email);
    
    Optional<UserResponse> updateUser(String id ,UserRequest userRequest);

    
}
