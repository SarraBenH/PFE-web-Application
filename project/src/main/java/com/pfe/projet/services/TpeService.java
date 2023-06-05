package com.pfe.projet.services;

import java.util.List;
import java.util.Optional;

import com.pfe.projet.dtos.requests.TpeRequest;
import com.pfe.projet.dtos.responses.TpeResponse;


public interface TpeService {

	   public Optional<TpeResponse> createTpe(TpeRequest tpeRequest) ;
	    public Optional<TpeResponse> getTpeById(Long id) ;
	    public List<TpeResponse> getAllTpe() ;
	    public Optional<TpeResponse> editTpeById(Long id, TpeRequest tpeRequest) ;
	    public void deleteTpeById(Long id) ;
	    public void deleteTpesByIds(List<Long> ids)  ;
}
