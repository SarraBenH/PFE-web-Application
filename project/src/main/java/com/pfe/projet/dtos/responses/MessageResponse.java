package com.pfe.projet.dtos.responses;

import lombok.Data;

import java.time.Instant;

@Data
public class MessageResponse {


    private Long id;
    private String content;
    private Instant dateMessage;
    private String source ;
    private String target;
    private String image;
}
