package com.pfe.projet.dtos.requests;

import java.time.Instant;



import com.pfe.projet.models.AlertStatut;
import com.pfe.projet.models.Gab;

import lombok.Data;

@Data
public class AlertRequest {

	private String message;
   
   // private Gab gab;
    
    private Instant dateAlerte;
 
    private AlertStatut etatAlerte ;
    private boolean emailSent ;

}
