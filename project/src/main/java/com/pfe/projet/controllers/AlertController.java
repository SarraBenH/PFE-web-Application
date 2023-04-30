package com.pfe.projet.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pfe.projet.dtos.requests.AlertRequest;
import com.pfe.projet.dtos.requests.GabRequest;
import com.pfe.projet.dtos.requests.IdListRequest;
import com.pfe.projet.dtos.responses.AlertResponse;
import com.pfe.projet.dtos.responses.GabResponse;
import com.pfe.projet.mappers.AlertMapper;
import com.pfe.projet.services.AlertService;

@RestController
@CrossOrigin("*")
@RequestMapping("/api")

public class AlertController {
	@Autowired
	private AlertService alertService ;


	  @PostMapping("/alert")
	    public ResponseEntity<AlertResponse> createAlert(@RequestBody AlertRequest alertRequest) {
	    	 return ResponseEntity.of(alertService.createAlert(alertRequest));  
	    	 }

	    @GetMapping("/alert/{id}")
	    public ResponseEntity<AlertResponse> getAlertById(@PathVariable Long id) {
	    	  return ResponseEntity.of(alertService.getAlertById(id)); 
	    }


	 
	    @GetMapping("/alerts")
	    public  ResponseEntity<List<AlertResponse>> getAllAlerts() {
	        return new ResponseEntity<>(alertService.getAllAlerts(), HttpStatus.OK);
	    }
	    @PostMapping("/alerts/email")
	    public void updateAlertEmail(@RequestBody IdListRequest ids ) {
	    	  alertService.updateAlertEmail(ids.getIds());  
	    	 }

	
	}

