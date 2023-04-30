package com.pfe.projet.dtos.responses;

import lombok.Data;

@Data
public class UserResponse {
    private String id;
    private String sessionId ;
    private String firstName;
    private String lastName ;
    private String email;
    private String city ;
    private String phoneNumber ;
    private String image ;
    private String position ;
    private Long[] alert_ids ;
}
