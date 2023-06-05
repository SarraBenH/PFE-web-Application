package com.pfe.projet.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pfe.projet.dtos.requests.GabRequest;
import com.pfe.projet.dtos.responses.GabResponse;
import com.pfe.projet.mappers.GabMapper;
import com.pfe.projet.mappers.UserMapper;
import com.pfe.projet.models.Gab;
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
    	           
    	           if (gabRequest.getCity() != null && !gabRequest.getCity().isEmpty()) {
    	        	   gabToUpdate.setCity(gabRequest.getCity());
    	           }
    	           if (gabRequest.getStatutGab() != null && !gabRequest.getStatutGab().equals("")) {
    	        	   gabToUpdate.setStatutGab(gabRequest.getStatutGab());
    	           }
    	           if (gabRequest.getEtatK1() != null && !gabRequest.getEtatK1().isEmpty()) {
    	        	   gabToUpdate.setEtatK1(gabRequest.getEtatK1());
    	           }
    	          
    	           if (gabRequest.getEtatK2() != null && !gabRequest.getEtatK2().isEmpty()) {
    	        	   gabToUpdate.setEtatK2(gabRequest.getEtatK2());
    	           }
    	           if (gabRequest.getEtatK3() != null && !gabRequest.getEtatK3().isEmpty()) {
    	        	   gabToUpdate.setEtatK3(gabRequest.getEtatK3());
    	           }
    	           if (gabRequest.getEtatK4() != null && !gabRequest.getEtatK4().isEmpty()) {
    	        	   gabToUpdate.setEtatK4(gabRequest.getEtatK4());
    	           }
    	           if (gabRequest.getEtatSuppJournal() != null && !gabRequest.getEtatSuppJournal().isEmpty()) {
    	        	   gabToUpdate.setEtatSuppJournal(gabRequest.getEtatSuppJournal());
    	           }
    	           if (gabRequest.getEtatSuppK1() != null && !gabRequest.getEtatSuppK1().isEmpty()) {
    	        	   gabToUpdate.setEtatSuppK1(gabRequest.getEtatSuppK1());
    	           }
    	           if (gabRequest.getEtatSuppK2() != null && !gabRequest.getEtatSuppK2().isEmpty()) {
    	        	   gabToUpdate.setEtatSuppK2(gabRequest.getEtatSuppK2());
    	           }
    	           if (gabRequest.getEtatSuppK3() != null && !gabRequest.getEtatSuppK3().isEmpty()) {
    	        	   gabToUpdate.setEtatSuppK3(gabRequest.getEtatSuppK3());
    	           }
    	           if (gabRequest.getEtatSuppK4() != null && !gabRequest.getEtatSuppK4().isEmpty()) {
    	        	   gabToUpdate.setEtatSuppK4(gabRequest.getEtatSuppK4());
    	           }
    	           if (gabRequest.getEtatSuppTicket() != null && !gabRequest.getEtatSuppTicket().isEmpty()) {
    	        	   gabToUpdate.setEtatSuppTicket(gabRequest.getEtatSuppTicket());
    	           }
    	           if (gabRequest.getIdentifiant() != null && !gabRequest.getIdentifiant().isEmpty()) {
    	        	   gabToUpdate.setIdentifiant(gabRequest.getIdentifiant());
    	           }
    	           if (gabRequest.getJdab() != null && !gabRequest.getJdab().isEmpty()) {
    	        	   gabToUpdate.setJdab(gabRequest.getJdab());
    	           }
    	           if (gabRequest.getAddress() != null && !gabRequest.getAddress().isEmpty()) {
    	        	   gabToUpdate.setAddress(gabRequest.getAddress());
    	           }
    	           if (gabRequest.getLatitude() != null && !gabRequest.getLatitude().isEmpty()) {
    	        	   gabToUpdate.setLatitude(gabRequest.getLatitude());
    	           }
    	           if (gabRequest.getLongitude() != null && !gabRequest.getLongitude().isEmpty()) {
    	        	   gabToUpdate.setLongitude(gabRequest.getLongitude());
    	           }
    	           if (gabRequest.getEtatCoffre() != null && !gabRequest.getEtatCoffre().isEmpty()) {
    	        	   gabToUpdate.setEtatCoffre(gabRequest.getEtatCoffre());
    	           }
    	           if (gabRequest.getEtatSuppCoffre() != null && !gabRequest.getEtatSuppCoffre().isEmpty()) {
    	        	   gabToUpdate.setEtatCoffre(gabRequest.getEtatSuppCoffre());
    	           }
    	           if (gabRequest.getEtatTicketClient() != null && !gabRequest.getEtatTicketClient().isEmpty()) {
    	        	   gabToUpdate.setEtatTicketClient(gabRequest.getEtatTicketClient());
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

    @Override
    public List<Map<String, Long>> getMostSuccessfulCity() {
        return gabRepository.getMostSuccessfulCity();
    }
    @Override
    public List<Map<String, Long>> getWorstCity() {
        return gabRepository.getWorstCity();
    }




}
