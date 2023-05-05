package com.pfe.projet.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pfe.projet.dtos.requests.GabRequest;
import com.pfe.projet.dtos.responses.GabResponse;
import com.pfe.projet.mappers.GabMapper;
import com.pfe.projet.mappers.UserMapper;
import com.pfe.projet.models.Gab;
import com.pfe.projet.models.User;
import com.pfe.projet.repositories.GabRepository;

@Service
public class GabServiceImpl implements GabService {

    @Autowired
    private GabRepository gabRepository;


    @Override
    public Optional<GabResponse>  createGab(GabRequest gabRequest) {
        Optional<Gab> optionalGab = GabMapper.convertGabRequestToGab(gabRequest);
        if(optionalGab.isPresent()) {
           Gab gab = gabRepository.save(optionalGab.get());
            return GabMapper.convertGabToGabResponse(gab);
        }
    return Optional.empty();
    }

    @Override
    public Optional<GabResponse>  getGabById(Long id) {
        Optional<Gab> gabOptional = gabRepository.findById(id);
        if(gabOptional.isPresent()) {
            return GabMapper.convertGabToGabResponse(gabOptional.get());
 
        }
        return Optional.empty();
    }
    @Override
    public List<GabResponse> getAllGabs() {
        List<Gab> gabs = gabRepository.findAll();
        List<GabResponse> gabResponseList = new ArrayList<>();
        gabs.forEach((gab)->{
            Optional<GabResponse> optionalGabResponse = GabMapper.convertGabToGabResponse(gab);
            optionalGabResponse.ifPresent(gabResponseList::add);
        });
        return gabResponseList;
    }
    
    @Override
    public void deleteGabById(Long id) {
        if(gabRepository.existsById(id)) {
            gabRepository.deleteById(id);
        }
       
    }
    @Override
    public void deleteGabsByIds(List<Long> ids) {
    	if(!ids.isEmpty()) {
    		ids.forEach((id) -> {
    			deleteGabById(id);
    		});
    	}
    }

    @Override
    public Optional<GabResponse> editGabById(Long id, GabRequest gabRequest) {
        Optional<Gab> optionalGab = gabRepository.findById(id);
        if(optionalGab.isPresent()) {
        	 if(gabRequest != null) {
        		  Gab gabToUpdate = optionalGab.get();
    	    	
    	 	     if (gabRequest.getEnseigne() != null && !gabRequest.getEnseigne().isEmpty()) {
    	 	    	gabToUpdate.setEnseigne(gabRequest.getEnseigne());
    	           }
    	           if (gabRequest.getEtatCommunication() != null && !gabRequest.getEtatCommunication().isEmpty()) {
    	        	   gabToUpdate.setEtatCommunication(gabRequest.getEtatCommunication());
    	           }
    	           if (gabRequest.getEtatGab() != null && !gabRequest.getEtatGab().equals("")) {
    	        	   gabToUpdate.setEtatGab(gabRequest.getEtatGab());
    	           }
    	           if (gabRequest.getEtatK7() != null && !gabRequest.getEtatK7().isEmpty()) {
    	        	   gabToUpdate.setEtatK7(gabRequest.getEtatK7());
    	           }
    	          
    	           if (gabRequest.getEtatKeys() != null && !gabRequest.getEtatKeys().isEmpty()) {
    	        	   gabToUpdate.setEtatKeys(gabRequest.getEtatKeys());
    	           }
    	           if (gabRequest.getEtatService() != null && !gabRequest.getEtatService().isEmpty()) {
    	        	   gabToUpdate.setEtatService(gabRequest.getEtatService());
    	           }
    	           if (gabRequest.getIdentifiant() != null && !gabRequest.getIdentifiant().isEmpty()) {
    	        	   gabToUpdate.setIdentifiant(gabRequest.getIdentifiant());
    	           }
    	           if (gabRequest.getJDAB() != null && !gabRequest.getJDAB().isEmpty()) {
    	        	   gabToUpdate.setJDAB(gabRequest.getJDAB());
    	           }
    	           if (gabRequest.getAddress() != null && !gabRequest.getAddress().isEmpty()) {
    	        	   gabToUpdate.setAddress(gabRequest.getAddress());
    	           }
    	        //   if (gabRequest.getAlerts() != null && !gabRequest.getAlerts().isEmpty()) {
    	        //	   gabToUpdate.setAlerts(gabRequest.getAlerts());
    	        //   }
    	           Gab savedGab = gabRepository.save(gabToUpdate);
    	          return GabMapper.convertGabToGabResponse(savedGab);
    	          // return Optional.of(UserMapper.convertUserObjectToUserResponse(savedUser));

    	     }
        }
        return Optional.empty();
    }



}
