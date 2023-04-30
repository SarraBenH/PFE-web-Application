package com.pfe.projet.models;


import lombok.Data;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import org.hibernate.annotations.GenericGenerator;

import javassist.bytecode.ByteArray;

import javax.persistence.Column;
@Entity
@Data
@Table(name = "user")
public class User {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    private String id;
    
    @Column(name="session_id")
    private String sessionId ;
    
    @Column(name = "first_name")
    private String firstName;
    @Column(name = "last_name")
    private String lastName;
    
    @Column(name = "email" , unique=true)
    private String email;
    
    @Column(name = "password")
    private String password;
    
    @Column(name = "city")
    private String city;
    
    @Column(name = "phone_number")
    private String phoneNumber;
    
    @Column(name = "img" ,columnDefinition = "LONGTEXT")
    @Lob
    private String image;
    
    @Column(name = "position")
    private String position;
    
    @Column(name="alert_ids")
    private Long[] alert_ids ;
}



 