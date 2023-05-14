package com.pfe.projet.controllers;

import com.pfe.projet.dtos.requests.MessageRequest;
import com.pfe.projet.dtos.responses.AlertResponse;
import com.pfe.projet.dtos.responses.MessageResponse;
import com.pfe.projet.services.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api")
public class MessageController {
    @Autowired
    MessageService messageService;


    @PostMapping("/message")
    public ResponseEntity<MessageResponse> createMessage(@RequestBody MessageRequest messageRequest) {
        return ResponseEntity.of(messageService.createMessage(messageRequest));
    }

    @GetMapping("/message/{id}")
    public ResponseEntity<MessageResponse> getMessageById(@PathVariable Long id) {
        return ResponseEntity.of(messageService.getMessageById(id));
    }

    @DeleteMapping("/message/{id}")
    public void deleteMessage(@PathVariable Long id) {
        messageService.deleteMessageById(id);
    }
    @DeleteMapping("/messages")
    void deleteMessages(@RequestBody ArrayList<Long> ids) {
        messageService.deleteMessagesByIds(ids);
    }

    @GetMapping("/messages/{userId}")
    public  ResponseEntity<List<MessageResponse>> getAllMessagesByUserId(@PathVariable String userId) {
        return new ResponseEntity<>(messageService.getAllMessagesByUserId(userId), HttpStatus.OK);
    }
}
