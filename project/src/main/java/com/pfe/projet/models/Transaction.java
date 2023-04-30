package com.pfe.projet.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Data
@Entity
@Table(name = "transaction")
public class Transaction {
	   @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;
	   
	   @Column(name="DATE_OPERATION") 
	   private String dateOperation ;
	   
	   @Column(name="NUMERO_CARTE") 
	   private String numeroCarte ;
	   
	   @Column(name="BIN") 
	   private String bin ;
	   
	   @Column(name="TYPE_OPERATION") 
	   private String typeOperation ;
	   
	   @Column(name="MONTANT_OPERATION") 
	   private String montantOperation ;
	   
	   @Column(name="CODE_REPONSE") 
	   private String codeReponse ;
	   
	   @Column(name="STATUT_OPERATION") 
	   private String statutOperation ;
	   
	   @Column(name="EXTENDED_CODE_REPONSE") 
	   private String extendedCodeReponse ;
	   
	   @Column(name="EXTENDED_MSG_REPONSE") 
	    private String extendedMsgReponse ;
	   
	   @Column(name="CODE_TERMINAL") 
	   private String codeTerminal ;
	   
	   @Column(name="CODE_AFFILIE") 
	   private String codeAffilie ;
	   
	   @Column(name="ENSEIGNE") 
	   private String enseigne ;
	   
	   @Column(name="PAYS") 
	   private String pays ;
	   
	   @Column(name="MCC") 
	   private String mcc ;
	   
	   @Column(name="TYPE_TRANSACTION") 
	   private String typeTransaction ;
	   
	   
	   

}
