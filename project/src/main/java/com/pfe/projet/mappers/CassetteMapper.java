package com.pfe.projet.mappers;

import java.util.Optional;

import org.springframework.stereotype.Component;

import com.pfe.projet.dtos.requests.CassetteRequest;
import com.pfe.projet.dtos.responses.CassetteResponse;
import com.pfe.projet.models.Cassette;

@Component
public class CassetteMapper {

	  public static Optional<Cassette>  convertCassetteRequestToCassette(CassetteRequest casetteRequest) {
	        if (casetteRequest == null) {
	            return Optional.empty();
	        }

	    	Cassette cassette = new Cassette();
	    	cassette.setTotalCoffre(casetteRequest.getTotalCoffre());
	    	cassette.setEnseigneGab(casetteRequest.getEnseigneGab());
	    	cassette.setLastDateCharged(casetteRequest.getLastDateCharged());
	    	cassette.setMontantCharged(casetteRequest.getMontantCharged());
	    	cassette.setMontantDe(casetteRequest.getMontantDe());
	        cassette.setMontantEx(casetteRequest.getMontantEx());
	        cassette.setNumGab(casetteRequest.getNumGab());
	        cassette.setSoldeK71(casetteRequest.getSoldeK71());
	        cassette.setSoldeK72(casetteRequest.getSoldeK72());
	        cassette.setSoldeK73(casetteRequest.getSoldeK73());
	        cassette.setSoldeK74(casetteRequest.getSoldeK74());
	        
	        cassette.setValeurk71(casetteRequest.getValeurk71());
	        cassette.setValeurK72(casetteRequest.getValeurK72());
	        cassette.setValeurK73(casetteRequest.getValeurK73());
	        cassette.setValeurK74(casetteRequest.getValeurK74());
	        
	        

	        
	  
	        return Optional.of(cassette);
	    }

	    public static Optional<CassetteResponse> convertCassetteToCassetteResponse(Cassette cassette) {
	    	
	    	 if (cassette == null) {
	             return Optional.empty();
	         }
	        CassetteResponse cassetteResponse = new CassetteResponse();
	        
	        cassetteResponse.setId(cassette.getId());
	        cassetteResponse.setTotalCoffre(cassette.getTotalCoffre());
	        cassetteResponse.setEnseigneGab(cassette.getEnseigneGab());
	        cassetteResponse.setNumGab(cassette.getNumGab());
	        cassetteResponse.setLastDateCharged(cassette.getLastDateCharged());
	        cassetteResponse.setMontantCharged(cassette.getMontantCharged());
	        cassetteResponse.setMontantDecharged(cassette.getMontantDecharged());
	        cassetteResponse.setMontantDe(cassette.getMontantDe());
	        cassetteResponse.setMontantEx(cassette.getMontantEx());
	        
	        cassetteResponse.setSoldeK71(cassette.getSoldeK71());
	        cassetteResponse.setSoldeK72(cassette.getSoldeK72());
	        cassetteResponse.setSoldeK73(cassette.getSoldeK73());
	        cassetteResponse.setSoldeK74(cassette.getSoldeK74());
	        
	        cassetteResponse.setValeurk71(cassette.getValeurk71());
	        cassetteResponse.setValeurK72(cassette.getValeurK72());
	        cassetteResponse.setValeurK73(cassette.getValeurK73());
	        cassetteResponse.setValeurK74(cassette.getValeurK74());
	        
	   
	        return Optional.of(cassetteResponse);
	    }
}
