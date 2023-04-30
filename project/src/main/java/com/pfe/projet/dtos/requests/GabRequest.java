package com.pfe.projet.dtos.requests;

import java.util.Set;

import com.pfe.projet.models.Alert;
import com.pfe.projet.models.EtatGab;

import lombok.Data;

@Data
public class GabRequest {
	    private String etatService;
	    private String identifiant ;
	    private EtatGab  etatGab;
	    private String enseigne;
	    private String etatK7;
	    private String JDAB;
	    private String etatCommunication;
	    private String etatKeys;
	  //  private Set<Alert> alerts ;



	   



}
