package com.pfe.projet.services;

import com.pfe.projet.models.User;

public interface LoginService {
	
	User authenticate(String email , String password) ;

}
