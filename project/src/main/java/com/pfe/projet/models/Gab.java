package com.pfe.projet.models;

import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.Data;


@Entity
@Data 
@Table(name = "GAB")
public class Gab {
	
	private static final long serialVersionUID = 1L;
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
	@Column(name="ID_GAB")
	private String identifiant ;
    
    @Column(name="STATUT_GAB")
	private String  statutGab;
    
    @Column(name = "ENSEIGNE")
    private String enseigne;
    
    
    @Column(name = "ETAT_HARD_JOURNAL")
    private String JDAB;
    
    @Column(name = "ETAT_COMMUNICATION")
    private String etatCommunication;
    
   
    @Column(name="ADRESSE_GAB")
    private String address ;
    
    @Column(name = "LATITUDE")
    private String latitude;
    
    @Column(name = "LONGITUDE")
    private String longitude;
    
    @Column(name="ETAT_HARD_COFFRE")
    private String etatCoffre ;
    
    @Column(name="ETAT_SUPPL_COFFRE")
    private String etatSuppCoffre ;
    
    @Column(name = "ETAT_HARD_K1")
    private String etatK1;
    
    @Column(name = "ETAT_HARD_K2")
    private String etatK2;
    
    @Column(name = "ETAT_HARD_K3")
    private String etatK3;
    
    @Column(name = "ETAT_HARD_K4")
    private String etatK4;
    
    @Column(name = "ETAT_HARD_TICKET_CLIENT")
    private String etatTicketClient;
    
    
    @Column(name = "ETAT_SUPPL_K1")
    private String etatSuppK1;
    
    @Column(name = "ETAT_SUPPL_K2")
    private String etatSuppK2;
    
    @Column(name = "ETAT_SUPPL_K3")
    private String etatSuppK3;

    @Column(name = "ETAT_SUPPL_K4")
    private String etatSuppK4;

    @Column(name = "ETAT_SUPPL_TICKET_CLIENT")
    private String etatSuppTicket;

    @Column(name = "ETAT_SUPPL_JOURNAL")
    private String etatSuppJournal;

    
 /*   
    @OneToMany(mappedBy = "gab")
    private Set<Alert> alerts ;*/
    
    
  
    

}
