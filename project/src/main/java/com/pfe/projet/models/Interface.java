package com.pfe.projet.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Data
@Table(name="interface")
@Entity
public class Interface {
	
	  @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;
	    
	    @Column(name="INT_CODE")
	    private int intCode ;
	    
	    @Column(name="INT_IDEN")
	    private String intIden ;
	    
	    @Column(name="INT_LABE")
	    private String intLabe ;
	    
	    @Column(name="INT_PRIM_PORT")
	    private int intPrimPort ;
	    
	    @Column(name="INT_PRIM_ADRE")
	    private String intPrimAdre ;
	    
	    @Column(name="INT_STAT")
	    private int status ;

}
