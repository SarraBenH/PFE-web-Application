package com.pfe.projet.dtos.requests;

import java.util.Set;

import com.pfe.projet.models.Alert;

import lombok.Data;

@Data
public class GabRequest {
	    private String etatService;
	    private String identifiant ;
	    private String statutGab;
	    private String enseigne;
	    private String JDAB;
	    private String etatCommunication;
	    private String address ;
	    private String latitude;
	    private String longitude;
	    
	    private String etatK1;
	    private String etatK2;
	    private String etatK3;
	    private String etatK4;
	    
	    private String etatTicketClient;
	    private String etatSuppK1;
	    private String etatSuppK2;
	    private String etatSuppK3;
	    private String etatSuppK4;
	    private String etatSuppTicket;
	    private String etatSuppJournal;
	    private String etatCoffre ;
	    private String etatSuppCoffre ;

	  //  private Set<Alert> alerts ;



	   



}
