package com.pfe.projet.services;

import java.util.List;
import java.util.Optional;

import com.pfe.projet.dtos.requests.InterfaceRequest;
import com.pfe.projet.dtos.responses.InterfaceResponse;

public interface InterfaceService {
	   Optional<InterfaceResponse> createInterface(InterfaceRequest interfaceRequest) ;
	   Optional<InterfaceResponse> getInterfaceById(Long id) ;
	   List<InterfaceResponse> getAllInterfaces() ;
	   void deleteInterfaceById(Long id) ;
	   void deleteInterfacesByIds(List<Long> ids) ;
	   Optional<InterfaceResponse> editInterfaceById(Long id, InterfaceRequest interfaceRequest) ;

}
