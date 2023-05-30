package com.pfe.projet.dtos.requests;

import lombok.Data;

@Data
public class CassetteRequest {
	private String numGab ;
	private String enseigneGab ;
	private String valeurk71 ;
	private String soldeK71 ;
	private String valeurK72 ;
	private String soldeK72 ;
	private String valeurK73 ;
	private String soldeK73 ;
	private String valeurK74 ;
	private String soldeK74 ;
	private String totalCoffre ;
	private String lastDateCharged ;
	private String montantCharged ;
	private String montantDecharged ;
	private String montantEx ;
	private String montantDe ;

}
