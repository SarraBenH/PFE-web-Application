package com.pfe.projet.models;

import java.time.Instant;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;

@Data
@Entity
@Table(name="alert")
public class Alert {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name="message")
    private String message;
    /*
    @ManyToOne
    @JoinColumn(name = "gab_id")
    @JsonIgnoreProperties("alerts")
    private Gab gab;*/
    
    private Instant dateAlerte;
    
    @Enumerated(EnumType.STRING)
    private AlertStatut etatAlerte ;
    
    @Column(name="email_sent" , nullable = false )
    private Boolean emailSent = false ;
    
    

}
