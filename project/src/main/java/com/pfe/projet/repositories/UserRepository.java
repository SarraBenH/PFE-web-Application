package com.pfe.projet.repositories;

import com.pfe.projet.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserRepository extends JpaRepository<User,String> {
    
	User findByEmail(String email);
	@Query("SELECT v FROM User v WHERE ((lower(v.lastName)) like concat('%',lower(:text),'%')) or ((lower(v.firstName)) like concat('%',lower(:text),'%')) or (concat(lower(v.firstName),' ',lower(v.lastName)) like concat('%',lower(:text),'%')) or ((concat(lower(v.lastName),' ',lower(v.firstName)) like concat('%',lower(:text),'%')))")
	List<User> getUsersByName(@Param("text") String text);
}
