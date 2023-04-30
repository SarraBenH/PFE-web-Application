package com.pfe.projet.controllers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pfe.projet.dtos.requests.GabRequest;
import com.pfe.projet.dtos.requests.UserRequest;
import com.pfe.projet.dtos.responses.GabResponse;
import com.pfe.projet.dtos.responses.UserResponse;
import com.pfe.projet.mappers.GabMapper;
import com.pfe.projet.models.Gab;
import com.pfe.projet.services.GabService;


@RestController
@CrossOrigin("*")
@RequestMapping("/api")
public class GabController {
     @Autowired
     GabService gabService;
  


    @PostMapping("/gab")
    public ResponseEntity<GabResponse> createGab(@RequestBody GabRequest gabRequest) {
    	 return ResponseEntity.of(gabService.createGab(gabRequest));  
    	 }

    @GetMapping("/gab/{id}")
    public ResponseEntity<GabResponse> getGabById(@PathVariable Long id) {
    	  return ResponseEntity.of(gabService.getGabById(id)); 
    }
/*
    @PutMapping("/{id}")
    public ResponseEntity<GabResponse> updateGab(@PathVariable Long id, @RequestBody GabRequest gabRequest) {
        Optional<Gab> optionalGab = gabService.getGabById(id);
        if (optionalGab.isPresent()) {
            Gab gabToUpdate = optionalGab.get();
            gabToUpdate.setName(gabRequest.getName());
            gabToUpdate.setCity(gabRequest.getCity());
            Gab updatedGab = gabService.updateGab(gabToUpdate);
            GabResponse gabResponse = gabMapper.convertGabObjectToGabResponse(updatedGab);
            return ResponseEntity.ok(gabResponse);
        } else {
            return ResponseEntity.notFound().build();
        }
    }*/

 
    @GetMapping("/gabs")
    public  ResponseEntity<List<GabResponse>> getAllGabs() {
        return new ResponseEntity<>(gabService.getAllGabs(), HttpStatus.OK);
    }
    @PutMapping("/gab/{id}")
    ResponseEntity<GabResponse> updateGab(@PathVariable Long id ,@RequestBody GabRequest gabRequest) {
       return ResponseEntity.of(gabService.editGabById(id , gabRequest)) ;
   }
    @DeleteMapping("/gab/{id}")
    void deleteGab(@PathVariable Long id) {
    	gabService.deleteGabById(id);
    }
    @DeleteMapping("/gabs")
    void deleteGabs(@RequestBody ArrayList<Long> ids) {
    	gabService.deleteGabsByIds(ids) ;
    }
}

