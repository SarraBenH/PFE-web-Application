package com.pfe.projet.dtos.responses;

import java.time.Instant;

import com.pfe.projet.models.AlertStatut;
import com.pfe.projet.models.Gab;

import lombok.Data;

@Data
public class AlertResponse {
	
	private Long id ;
	private String message;
	   
   // private Long gab_id;
    
    private Instant dateAlerte;
    private AlertStatut etatAlerte ;
    private boolean emailSent ;
}
