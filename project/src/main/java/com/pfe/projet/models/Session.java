package com.pfe.projet.models;

import java.time.LocalDateTime;
import java.util.Date;

import lombok.Data;

@Data
public class Session {
	  private String sessionId;
	  private String id;
	  private LocalDateTime expiresAt;

public Session(String sessionId , String id ,  LocalDateTime expiresA) {
	this.sessionId=sessionId ;
	this.id=id ;
	this.expiresAt =expiresA ;
}
	
	}
