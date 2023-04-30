package com.pfe.projet.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pfe.projet.mappers.UserMapper;
import com.pfe.projet.models.User;
import com.pfe.projet.repositories.UserRepository;

@Service
public class LoginServiceImpl implements LoginService {

	@Autowired
	UserRepository userRepository ;
	
	
	@Override
	public User authenticate(String email, String password) {
		User user = userRepository.findByEmail(email) ;
		if(user==null) {
			return null ;
		}
		String hashedPassword = UserMapper.hashPassword(password);
		if (hashedPassword.equals(user.getPassword())) {
			return user ;
		}
		return null;
	}
	

}
