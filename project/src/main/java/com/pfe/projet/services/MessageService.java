package com.pfe.projet.services;

import com.pfe.projet.dtos.requests.MessageRequest;
import com.pfe.projet.dtos.responses.MessageResponse;

import java.util.List;
import java.util.Optional;

public interface MessageService {

    Optional<MessageResponse> createMessage (MessageRequest messageRequest) ;
    Optional<MessageResponse>  getMessageById(Long id) ;
    void deleteMessagesByIds(List<Long> ids);
    void  deleteMessageById(Long id) ;
    List<MessageResponse> getAllMessagesByUserId(String userId) ;
}
