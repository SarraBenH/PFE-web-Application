package com.pfe.projet.services;

import java.util.List;
import java.util.Optional;

import com.pfe.projet.dtos.requests.CassetteRequest;
import com.pfe.projet.dtos.responses.CassetteResponse;

public interface CassetteService {

    public Optional<CassetteResponse> createCassette(CassetteRequest cassetteRequest) ;
    public Optional<CassetteResponse> getCassetteById(Long id) ;
    public List<CassetteResponse> getAllCassettes() ;
    public Optional<CassetteResponse> editCassetteById(Long id, CassetteRequest cassetteRequest) ;
    public void deleteCassetteById(Long id) ;
    public void deleteCassettesByIds(List<Long> ids)  ;
    
}
