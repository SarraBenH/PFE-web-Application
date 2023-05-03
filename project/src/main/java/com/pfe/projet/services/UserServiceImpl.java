package com.pfe.projet.services;

import com.pfe.projet.dtos.requests.UserRequest;
import com.pfe.projet.dtos.responses.UserResponse;
import com.pfe.projet.mappers.UserMapper;
import com.pfe.projet.models.User;
import com.pfe.projet.repositories.UserRepository;

import org.hibernate.exception.ConstraintViolationException;
import org.hibernate.mapping.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService{
    @Autowired
    UserRepository userRepository;

    @Override
    public Optional<UserResponse> getUser(String id) {
        Optional<User> user = userRepository.findById(id);
        if (user.isPresent()){
            return UserMapper.convertUserObjectToUserResponse(user.get());
        }
        return Optional.empty();
    }

    @Override
    public Optional<UserResponse> createUser(UserRequest userRequest) {
        Optional<User> optionalUser = UserMapper.convertUserRequestToUserObject(userRequest);
        if (optionalUser.isPresent()){
        String email=userRequest.getEmail() ;
        if(email != null) {
        	User user = userRepository.findByEmail(email) ;
        	if(user != null) {
        		throw new ConstraintViolationException("Email already exist", new SQLException(), email);
        	}
        }
        	User user = userRepository.save(optionalUser.get());
            return UserMapper.convertUserObjectToUserResponse(user);
        }
        return Optional.empty();
    }

    @Override
    public List<UserResponse> getAllUsers() {
        List<User> users = userRepository.findAll();
        List<UserResponse> userResponseList = new ArrayList<>();
        users.forEach((user)->{
            Optional<UserResponse> optionalUserResponse = UserMapper.convertUserObjectToUserResponse(user);
            optionalUserResponse.ifPresent(userResponseList::add);
        });
        return userResponseList;
    }

	@Override
	public Optional<UserResponse> getUserByEmail(String email) {
		if(email != null) {
			User user = userRepository.findByEmail(email);
			return UserMapper.convertUserObjectToUserResponse(user);
		}
		return Optional.empty();
	}

	@Override
	public Optional<List<UserResponse>> getUserByName(String name) {
		if(name != null) {
			List<User> users = userRepository.getUsersByName(name);
			return UserMapper.convertUserObjectsToUserResponses(users);
		}
		return Optional.empty();	}

	@Override
	public  Optional<UserResponse> updateUser(String id ,UserRequest userRequest) {
        Optional<User> optionalUserToUpdate = userRepository.findById(id);
        
	  if (optionalUserToUpdate.isPresent()){
	     User userToUpdate = optionalUserToUpdate.get();
	     
	     if(userRequest != null) {
	    	 if (userRequest.getFirstName() != null && !userRequest.getFirstName().isEmpty()) {
		    	 userToUpdate.setFirstName(userRequest.getFirstName());
	           }
	 	     if (userRequest.getLastName() != null && !userRequest.getLastName().isEmpty()) {
	 	    	userToUpdate.setLastName(userRequest.getLastName());
	           }
	           if (userRequest.getCity() != null && !userRequest.getCity().isEmpty()) {
	        	   userToUpdate.setCity(userRequest.getCity());
	           }
	           if (userRequest.getPosition() != null && !userRequest.getPosition().isEmpty()) {
	        	   userToUpdate.setPosition(userRequest.getPosition());
	           }
	           if (userRequest.getImage() != null && !userRequest.getImage().isEmpty()) {
	        	   userToUpdate.setImage(userRequest.getImage());
	           }
	           if (userRequest.getPassword() != null && !userRequest.getPassword().isEmpty()) {
	        	   userToUpdate.setPassword(UserMapper.hashPassword(userRequest.getPassword()));
	           }
	           if (userRequest.getPhoneNumber() != null && !userRequest.getPhoneNumber().isEmpty()) {
	        	   userToUpdate.setPhoneNumber(userRequest.getPhoneNumber());
	           }
	           if (userRequest.getEmail() != null && !userRequest.getEmail().isEmpty()) {
	        	   userToUpdate.setEmail(userRequest.getEmail());
	           }
	           if (userRequest.getAlert_ids() != null && userRequest.getAlert_ids().length !=0) {
	        	   userToUpdate.setAlert_ids(userRequest.getAlert_ids());
	           }
	           if (userRequest.getSessionId() != null && !userRequest.getSessionId().isEmpty()) {
	        	   userToUpdate.setSessionId(userRequest.getSessionId());
	           }
	           User savedUser = userRepository.save(userToUpdate);
	          return UserMapper.convertUserObjectToUserResponse(savedUser);
	          // return Optional.of(UserMapper.convertUserObjectToUserResponse(savedUser));

	     }
	     
        }
	  return Optional.empty();
}
	
}
