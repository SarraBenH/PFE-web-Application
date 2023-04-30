package com.pfe.projet.dtos.requests;

import lombok.Data;

@Data
public class UserRequest {
	private String sessionId ;
    private String firstName;
    private String lastName;
    private String email;
    private String city;
    private String phoneNumber;
    private String image;
    private String position;
    private String password ;
    private Long[] alert_ids ;
	
    
    
}
