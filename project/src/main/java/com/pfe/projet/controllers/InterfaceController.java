package com.pfe.projet.controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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

import com.pfe.projet.dtos.requests.InterfaceRequest;
import com.pfe.projet.dtos.responses.InterfaceResponse;
import com.pfe.projet.mappers.InterfaceMapper;
import com.pfe.projet.models.Interface;
import com.pfe.projet.services.InterfaceService;



@RestController
@CrossOrigin("*")
@RequestMapping("/api")
public class InterfaceController {
	
    @Autowired
    InterfaceService interfaceService;
  
    @PostMapping("/interface")
    public ResponseEntity<InterfaceResponse> createInterface(@RequestBody InterfaceRequest interfaceRequest) {
    	return ResponseEntity.of(interfaceService.createInterface(interfaceRequest));
    }
    
    @GetMapping("/interface/{id}")
    public ResponseEntity<InterfaceResponse> getInterfaceById(@PathVariable Long id) {
    	return ResponseEntity.of(interfaceService.getInterfaceById(id));
    }

    @GetMapping("/interfaces")
    public ResponseEntity<List<InterfaceResponse>> getAllInterfaces() {
        return new ResponseEntity<>(interfaceService.getAllInterfaces(), HttpStatus.OK);

    }
    
    @PutMapping("/interface/{id}")
    ResponseEntity<InterfaceResponse> updateInterface(@PathVariable Long id ,@RequestBody InterfaceRequest interfaceRequest) {
       return ResponseEntity.of(interfaceService.editInterfaceById(id , interfaceRequest));
   }
    
    @DeleteMapping("/interface/{id}")
    void deleteInterface(@PathVariable Long id) {
    	interfaceService.deleteInterfaceById(id);
    }
    
    @DeleteMapping("/interfaces")
    void deleteInterfaces(@RequestBody ArrayList<Long> ids) {
    	interfaceService.deleteInterfacesByIds(ids) ;
    }
}
