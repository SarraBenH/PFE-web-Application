package com.pfe.projet.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pfe.projet.dtos.requests.LoginRequest;
import com.pfe.projet.dtos.requests.UserRequest;
import com.pfe.projet.exceptions.UnauthorizedException;
import com.pfe.projet.models.Session;
import com.pfe.projet.models.User;
import com.pfe.projet.services.LoginServiceImpl;
import com.pfe.projet.services.UserService;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

@RestController
@CrossOrigin("*")
@RequestMapping("/api")
public class LoginController {
	
	private Map<String, Session> sessions = new HashMap<>();
	@Autowired
	private LoginServiceImpl loginService ;
	@Autowired
	private UserService userService ;
	

	  @PostMapping("/login")
	  public Session login(@RequestBody LoginRequest loginRequest)  {
	    // Vérifiez les informations d'identification de l'utilisateur
	    User user = loginService.authenticate(loginRequest.getEmail(), loginRequest.getPassword());
	    if (user != null) {
	      // Générez un identifiant de session unique
	      String sessionId = UUID.randomUUID().toString();
	    Session session = new Session(sessionId, user.getId(), LocalDateTime.now().plusMinutes(120));
	    UserRequest userRequest = new UserRequest()  ;
	    userRequest.setSessionId(sessionId);
	    userService.updateUser(user.getId(), userRequest) ;
	      // Stockez la session dans la carte des sessions
	      sessions.put(sessionId, session);
	      // Retournez l'identifiant de session au client
	      return session;
	    } else {
	      // Retournez une réponse d'erreur au client
	      throw new UnauthorizedException("Invalid email or password");
	    }
	  }

}
