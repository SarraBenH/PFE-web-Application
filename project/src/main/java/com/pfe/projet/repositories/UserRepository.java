package com.pfe.projet.repositories;

import com.pfe.projet.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,String> {
    
	User findByEmail(String email);
}
