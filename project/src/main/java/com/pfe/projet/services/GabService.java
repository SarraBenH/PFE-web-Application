package com.pfe.projet.services;

import java.util.List;
import java.util.Optional;

import com.pfe.projet.dtos.requests.GabRequest;
import com.pfe.projet.dtos.responses.GabResponse;

public interface GabService {
	Optional<GabResponse>  createGab(GabRequest gabRequest) ;
	Optional<GabResponse>  getGabById(Long id) ;
	List<GabResponse> getAllGabs() ;
	void deleteGabById(Long id) ;
	void deleteGabsByIds(List<Long> ids) ;
	Optional<GabResponse> editGabById(Long id, GabRequest gabRequest);
	 }
