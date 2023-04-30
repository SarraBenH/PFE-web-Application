package com.pfe.projet.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pfe.projet.dtos.requests.AlertRequest;
import com.pfe.projet.dtos.responses.AlertResponse;
import com.pfe.projet.dtos.responses.GabResponse;
import com.pfe.projet.mappers.AlertMapper;
import com.pfe.projet.mappers.GabMapper;
import com.pfe.projet.models.Alert;
import com.pfe.projet.models.Gab;
import com.pfe.projet.repositories.AlertRepository;

@Service
public class AlertServiceImpl implements AlertService {
	
	@Autowired
	private AlertRepository alertRepo ;
	
	

	@Override
	public Optional<AlertResponse> createAlert(AlertRequest alertRequest) {
		  Optional<Alert> optionalAlert = AlertMapper.toAlert(alertRequest);
	        if(optionalAlert.isPresent()) {
	           Alert alert = alertRepo.save(optionalAlert.get());
	            return AlertMapper.toAlertResponse(alert);
	        }
	    return Optional.empty();
	}

	@Override
	public Optional<AlertResponse> getAlertById(Long id) {
		  Optional<Alert> alertOptional = alertRepo.findById(id);
	        if(alertOptional.isPresent()) {
	            return AlertMapper.toAlertResponse(alertOptional.get());
}
	        return Optional.empty();
	}

	@Override
	public List<AlertResponse> getAllAlerts() {

		  List<Alert> alerts = alertRepo.findAll();
	        List<AlertResponse> alertResponseList = new ArrayList<>();
	        alerts.forEach((alert)->{
	            Optional<AlertResponse> optionalAlertResponse = AlertMapper.toAlertResponse(alert);
	            optionalAlertResponse.ifPresent(alertResponseList::add);
	        });
	        return alertResponseList;
	}
	
	@Override
	public void updateAlertEmail(List<Long> ids) {
	    if(!ids.isEmpty()) {
	    	ids.forEach((id) -> {
	    		Optional<Alert> optionalAlert = alertRepo.findById(id) ;
	    		if(optionalAlert.isPresent()) {
	    			Alert alert =optionalAlert.get() ;
	    			alert.setEmailSent(true);
	    		    alertRepo.save(alert);
	    		}
	    	});
	    }
	}

}
