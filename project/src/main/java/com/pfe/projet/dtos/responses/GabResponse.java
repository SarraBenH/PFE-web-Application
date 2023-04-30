package com.pfe.projet.dtos.responses;

import java.util.Set;

import com.pfe.projet.models.Alert;
import com.pfe.projet.models.EtatGab;

import lombok.Data;

@Data
public class GabResponse {
	   private Long id ;
	   private String identifiant ;
	    private String etatService;
	    private EtatGab  etatGab;
	    private String enseigne;
	    private String etatK7;
	    private String JDAB;
	    private String etatCommunication;
	    private String etatKeys;
	 //   private Set<Alert> alerts ;

}
