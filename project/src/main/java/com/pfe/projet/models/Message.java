package com.pfe.projet.models;

import lombok.Data;

import javax.persistence.*;
import java.time.Instant;
@Data
@Entity
@Table(name = "message")
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="content",columnDefinition = "LONGTEXT")
    private String content;

    @Column(name="image",columnDefinition = "LONGTEXT")
    private String image;

    @Column(name="source")
    private String source;

    @Column(name="target")
    private String target;

    private Instant dateMessage;



}
