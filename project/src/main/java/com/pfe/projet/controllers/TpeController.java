package com.pfe.projet.controllers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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

import com.pfe.projet.dtos.requests.TpeRequest;
import com.pfe.projet.dtos.responses.TpeResponse;
import com.pfe.projet.services.TpeService;


@RestController
@CrossOrigin("*")
@RequestMapping("/api")
public class TpeController {
	
	 @Autowired
	    private TpeService tpeService;

	    @PostMapping("/tpe")
	    public ResponseEntity<TpeResponse> createTpe(@RequestBody TpeRequest tpeRequest) {
	        return ResponseEntity.of(tpeService.createTpe(tpeRequest));
	    }

	    @GetMapping("/tpe/{id}")
	    public ResponseEntity<TpeResponse> getTpeById(@PathVariable Long id) {
	        return ResponseEntity.of(tpeService.getTpeById(id));
	    }

	    @GetMapping("/TPEs")
	    public ResponseEntity<List<TpeResponse>> getAllTPEs() {
	        return ResponseEntity.ok(tpeService.getAllTpe());
	    }

	    @PutMapping("/tpe/{id}")
	    public ResponseEntity<TpeResponse> updateTpe(@PathVariable Long id, @RequestBody TpeRequest tpeRequest) {
	        return ResponseEntity.of(tpeService.editTpeById(id, tpeRequest));
	    }

	    @DeleteMapping("/tpe/{id}")
	    void deleteGab(@PathVariable Long id) {
	    	tpeService.deleteTpeById(id);
	    }
	    @DeleteMapping("/TPEs")
	    void deleteGabs(@RequestBody ArrayList<Long> ids) {
	    	tpeService.deleteTpesByIds(ids) ;
	    }



}
