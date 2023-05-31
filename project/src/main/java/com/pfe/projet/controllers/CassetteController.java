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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pfe.projet.dtos.requests.CassetteRequest;
import com.pfe.projet.dtos.responses.CassetteResponse;
import com.pfe.projet.services.CassetteService;

import io.swagger.v3.oas.annotations.parameters.RequestBody;

@RestController
@CrossOrigin("*")
@RequestMapping("/api")
public class CassetteController {
	
	 @Autowired
	    private CassetteService cassetteService;

	    @PostMapping("/cassette")
	    public ResponseEntity<CassetteResponse> createCassette(@RequestBody CassetteRequest cassetteRequest) {
	        return ResponseEntity.of(cassetteService.createCassette(cassetteRequest));
	    }

	    @GetMapping("/cassette/{id}")
	    public ResponseEntity<CassetteResponse> getCassetteById(@PathVariable Long id) {
	        return ResponseEntity.of(cassetteService.getCassetteById(id));
	    }

	    @GetMapping("/cassettes")
	    public ResponseEntity<List<CassetteResponse>> getAllCassettes() {
	        return ResponseEntity.ok(cassetteService.getAllCassettes());
	    }

	    @PutMapping("/cassette/{id}")
	    public ResponseEntity<CassetteResponse> updateCassette(@PathVariable Long id, @RequestBody CassetteRequest cassetteRequest) {
	        return ResponseEntity.of(cassetteService.editCassetteById(id, cassetteRequest));
	    }

	    @DeleteMapping("/cassette/{id}")
	    void deleteGab(@PathVariable Long id) {
	    	cassetteService.deleteCassetteById(id);
	    }
	    @DeleteMapping("/cassettes")
	    void deleteGabs(@RequestBody ArrayList<Long> ids) {
	    	cassetteService.deleteCassettesByIds(ids) ;
	    }


}
