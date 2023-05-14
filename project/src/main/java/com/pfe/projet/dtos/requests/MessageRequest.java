package com.pfe.projet.dtos.requests;

import lombok.Data;

import java.time.Instant;

@Data
public class MessageRequest {

    private String content;
    private Instant dateMessage;
    private String source ;
    private String target;

}
