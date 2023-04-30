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
    
	@Column(name="identifiant")
	private String identifiant ;
    
    @Column(name = "etat_service")
    private String etatService;
    
	@Enumerated(EnumType.STRING)
	private EtatGab  etatGab;
    
    @Column(name = "enseigne")
    private String enseigne;
    
    @Column(name = "etat_k7")
    private String etatK7;
    
    @Column(name = "JDAB")
    private String JDAB;
    
    @Column(name = "etat_communication")
    private String etatCommunication;
    
    @Column(name = "etat_keys")
    private String etatKeys;
 /*   
    @OneToMany(mappedBy = "gab")
    private Set<Alert> alerts ;*/
    
    
  
    

}
