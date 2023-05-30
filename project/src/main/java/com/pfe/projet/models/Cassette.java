package com.pfe.projet.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Data
@Table(name="cassette")
public class Cassette {

	private static final long serialVersionUID = 1L;
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
	
	@Column(name="NUM_GAB")
	private String numGab ;
	
	@Column(name="ENSEIGNE_GAB")
	private String enseigneGab ;
	
	@Column(name="VALEUR_K7_1")
	private String valeurk71 ;
	
	@Column(name="SOLDE_K7_1")
	private String soldeK71 ;
	
	@Column(name="VALEUR_K7_2")
	private String valeurK72 ;
	
	@Column(name="SOLDE_K7_2")
	private String soldeK72 ;
	
	@Column(name="VALEUR_K7_3")
	private String valeurK73 ;
	
	@Column(name="SOLDE_K7_3")
	private String soldeK73 ;
	
	@Column(name="VALEUR_K7_4")
	private String valeurK74 ;
	
	@Column(name="SOLDE_K7_4")
	private String soldeK74 ;
	
	
	@Column(name="TOTAL_COFFRE_GAB")
	private String totalCoffre ;
	
	@Column(name="LAST_DATE_CHARG")
	private String lastDateCharged ;
	
	@Column(name="MONTANT_CHARG")
	private String montantCharged ;
	
	@Column(name="MONTANT_DECHARG")
	private String montantDecharged ;
	
	@Column(name="MONTANT_EXCED")
	private String montantEx ;
	
	@Column(name="MONTANT_DEFICIT")
	private String montantDe ;
	
	
	
	
}
